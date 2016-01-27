package client;
import haxe.ds.GenericStack;

enum DiceToken {
    TRoll(left:Int, right:Int);
    TOperation(op:Op);
    TNumber(n:Int);
    TEoF;
}

enum Op {
    plus;
    minus;
    multiply;
    divide;
}

class DiceLexer extends hxparse.Lexer implements hxparse.RuleBuilder {
    static public var tok = @:rule [
        "[1-9][0-9]*d[1-9][0-9]*" => strToRoll(lexer.current),
        "\\+" => TOperation(plus),
        "\\-" => TOperation(minus),
        "\\*" => TOperation(multiply),
        "/" => TOperation(divide),
        "[0-9]+" => TNumber(Std.parseInt(lexer.current)),
        "" => TEoF
    ];

    static function strToRoll(str:String) {
        var regex = ~/([1-9][0-9]*)d([1-9][0-9]*)/;
        regex.match(str);
        return TRoll(Std.parseInt(regex.matched(1)), Std.parseInt(regex.matched(2)));
    }
}

class DiceParser extends hxparse.Parser<hxparse.LexerTokenSource<DiceToken>, DiceToken> implements hxparse.ParserBuilder {
        //Record of all individual dice rolls
    public var rolls:Map<Int, Array<Int>>;
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
        if(evalStackSize > 1) trace('More than one operand left over on the eval stack - Returning the first one');
        return evalStack.pop();
    }

    function parse_next() {
        switch stream {
            case [TRoll(l, r)]:
                pushToEval(last);
                return true;
            case [TNumber(n)]:
                pushToEval(last);
                return true;

            case [TOperation(op1)]:
                while(!shuntStack.isEmpty()) {
                    switch(shuntStack.first()) {
                        case TOperation(op2):
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

            case [TEoF]:
                return false;
        }
    }

    function precendence_of(op:Op) {
        switch(op) {
            case plus | minus:
                return 1;
            case multiply | divide:
                return 2;
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

            case TOperation(op) :
                if(evalStackSize < 2) throw "Not enough operands on the eval stack for operation" + op;
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
                }

            case TEoF:
                trace('TEoF was pushed onto the eval stack - Something went wrong!');
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