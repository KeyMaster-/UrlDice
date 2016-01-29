package client;
import haxe.ds.GenericStack;

enum DiceToken {
    TRoll(left:Int, right:Int);
    TOperator(op:Op);
    TNumber(n:Int);
    //Left and right parentheses
    TPLeft;
    TPRight;
    TEoF;
}

enum Op {
    plus;
    minus;
    multiply;
    divide;
    gt;
    gte;
    lt;
    lte;
    eq;
}

enum RoundMode {
    round;
    up;
    down;
    none;
}

class DiceLexer extends hxparse.Lexer implements hxparse.RuleBuilder {
    static public var tok = @:rule [
        "[1-9][0-9]*d[1-9][0-9]*" => strToRoll(lexer.current),
        "\\+" => TOperator(plus),
        "\\-" => TOperator(minus),
        "\\*" => TOperator(multiply),
        "/" => TOperator(divide),
        "\\(" => TPLeft,
        "\\)" => TPRight,
        "[0-9]+" => TNumber(Std.parseInt(lexer.current)),
        "(<|<=|>=|>|=)" => TOperator(strToCompOp(lexer.current)),
        "" => TEoF
    ];

    static function strToRoll(str:String) {
        var regex = ~/([1-9][0-9]*)d([1-9][0-9]*)/;
        regex.match(str);
        return TRoll(Std.parseInt(regex.matched(1)), Std.parseInt(regex.matched(2)));
    }

    static function strToCompOp(str:String) {
        var regex = ~/(<=|>=|<|>|=)/;
        regex.match(str);
        return switch(regex.matched(1)) {
            case '<':
                lt;
            case '<=':
                lte;
            case '>':
                gt;
            case '>=':
                gte;
            case '=':
                eq;
            case _:
                eq; //This will never be the case, so doesn't matter what we return;
        }
    }
}

class DiceParser extends hxparse.Parser<hxparse.LexerTokenSource<DiceToken>, DiceToken> implements hxparse.ParserBuilder {
        //Record of all individual dice rolls
    public var rolls:Map<Int, Array<Int>>;
    public var isComparison:Bool = false;
    public var roundMode:RoundMode = none;

    var shuntStack:GenericStack<DiceToken>;
    var evalStack:GenericStack<Float>;
    var evalStackSize:Int = 0;

    public function new(input:byte.ByteData) {
        rolls = new Map();
        shuntStack = new GenericStack<DiceToken>();
        evalStack = new GenericStack<Float>();

        var lexer = new DiceLexer(input);
        var ts = new hxparse.LexerTokenSource(lexer, DiceLexer.tok);
        super(ts);
    }

    public function parse() {
        while(parse_next()) {} //Repeatedly parse until the function indicates it is done with parsing
        while(!shuntStack.isEmpty()) {
            pushToEval(shuntStack.pop());
        }
        if(evalStackSize > 1) throw EvalStackTooBig;
        var result = evalStack.pop();
        return switch(roundMode) {
            case none:
                result;
            case round:
                Math.round(result);
            case up:
                Math.ceil(result);
            case down:
                Math.floor(result);
        }
    }

    function parse_next() {
        switch stream {
            case [TRoll(l, r)]:
                pushToEval(last);
                return true;
            case [TNumber(n)]:
                pushToEval(last);
                return true;

            case [TOperator(op1)]:
                while(!shuntStack.isEmpty()) {
                    switch(shuntStack.first()) {
                        case TOperator(op2):
                            if(precendence_of(op1) <= precendence_of(op2)) {
                                pushToEval(shuntStack.pop());
                            }
                            else {
                                break;
                            }
                        default:
                            break;
                    }
                }
                shuntStack.add(last);
                return true;

            case [TPLeft]:
                shuntStack.add(last);
                return true;

            case [TPRight]:
                while(shuntStack.first() != TPLeft) {
                    pushToEval(shuntStack.pop());
                    if(shuntStack.isEmpty()) {
                        throw ParenMismatch;
                    }
                }
                if(shuntStack.pop() == null) throw ParenMismatch;
                return true;
            case [TEoF]:
                return false;
        }
    }

    function precendence_of(op:Op) {
        switch(op) {
            case lt | lte | gt | gte | eq:
                return 1;
            case plus | minus:
                return 2;
            case multiply | divide:
                return 3;
        }
    }

    function pushToEval(token:DiceToken) {
        switch(token) {
            case TNumber(n):
                evalStack.add(n);
                evalStackSize++;

            case TRoll(left, right):
                var dice_result = 0;
                for(i in 0...left) {
                    var res =  Math.floor(Math.random() * right) + 1;
                    addRollResult(right, res);
                    dice_result += res;
                }

                evalStack.add(dice_result);
                evalStackSize++;

            case TOperator(op) :
                if(evalStackSize < 2) throw NotEnoughOperands;
                switch(op) {
                    case plus:
                        evalStack.add(evalStack.pop() + evalStack.pop());
                        evalStackSize--; //Popped 2, added 1
                    case minus:
                        var rhs = evalStack.pop();
                        var lhs = evalStack.pop();
                        evalStack.add(lhs - rhs);
                        evalStackSize--;
                    case multiply:
                        evalStack.add(evalStack.pop() * evalStack.pop());
                        evalStackSize--;
                    case divide:
                        var rhs = evalStack.pop();
                        var lhs = evalStack.pop();
                        evalStack.add(lhs / rhs);
                        evalStackSize--;
                    case lt | lte | gt | gte | eq:
                        if(isComparison) throw TooManyComparisons;
                        isComparison = true;
                        var rhs = evalStack.pop();
                        var lhs = evalStack.pop();
                        var result = switch(op) {
                            case lt:
                                lhs < rhs;
                            case lte:
                                lhs <= rhs;
                            case gt:
                                lhs > rhs;
                            case gte:
                                lhs >= rhs;
                            case eq:
                                lhs == rhs;
                            default:
                                false; //Doesn't matter
                        }
                        evalStack.add(result ? 1 : 0);
                        evalStackSize--;
                }

            case TEoF:
                throw TEoFInEvalStack;

            case TPLeft | TPRight:
                throw ParenMismatch;
        }
    }

    inline function addRollResult(sides:Int, result:Int) {
        if(rolls.exists(sides)) {
            rolls.get(sides).push(result);
        }
        else {
            rolls.set(sides, [result]);
        }
    }
}

@:enum
abstract ParsingError(Int) from Int to Int {
    var ParenMismatch = 0;
    var NotEnoughOperands = 1;
    var TooManyComparisons = 2;
    var EvalStackTooBig = 3;
    var TEoFInEvalStack = 4;
}