
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
}

class DiceLexer extends hxparse.Lexer implements hxparse.RuleBuilder {
    static public var tok = @:rule [
        "[1-9]+d[1-9]+" => strToRoll(lexer.current),
        "\\+" => TOperation(plus),
        "\\-" => TOperation(minus),
        "\\*" => TOperation(multiply),
        "[0-9]+" => TNumber(Std.parseInt(lexer.current)),
        "" => TEoF
    ];

    static function strToRoll(str:String) {
        var regex = ~/([1-9]+)d([1-9]+)/;
        regex.match(str);
        return TRoll(Std.parseInt(regex.matched(1)), Std.parseInt(regex.matched(2)));
    }
}

class DiceParser extends hxparse.Parser<hxparse.LexerTokenSource<DiceToken>, DiceToken> implements hxparse.ParserBuilder {
        //Record of all individual dice rolls
    public var rolls:Array<Roll>;
    public function new(input:byte.ByteData) {
        rolls = [];
        var lexer = new DiceLexer(input);
        var ts = new hxparse.LexerTokenSource(lexer, DiceLexer.tok);
        super(ts);
    }

    public function parse() {
        return parse_numeric(parse_block()); //Consume the first block since parse_numeric expects an operation
    }

        //This parses the next "block", which are all numeric parts connected by multiplications (i.e. 2d6*3*5d7 is one block)
        //This is necessary to ensure order of operations 
    function parse_block() {
        return switch stream {
            case [TRoll(left, right)]:
                var dice_result = 0;
                for(i in 0...left) {
                    var res =  Math.floor(Math.random() * right) + 1;
                    rolls.push({
                        sidenum:right,
                        result:res
                    });
                    dice_result += res;
                }
                check_mult(dice_result);

            case [TNumber(n)]:
                check_mult(n);
        }
    }

        //Looks ahead in the token stream to see if the next operation is a multiplication
        //If it is, the block parsing continues, otherwise, we stop and return back to parse_numeric (eventually)
    function check_mult(left:Int):Int {
        return switch(this.peek(0)) {
            case TOperation(multiply):
                this.junk();
                left * parse_block();
            case _:
                left;
        }
    }
        //This handles the actual combination of blocks (through + and - operations)
    function parse_numeric(total:Int) {
        return switch stream {
            case [TOperation(op)]:
                switch(op) {
                    case plus:
                        total += parse_block();
                        parse_numeric(total);

                    case minus:
                        total -= parse_block();
                        parse_numeric(total);
                    case multiply:
                        trace('This should never be reached...');
                        total;
                };

            case [TEoF]:
                total;
        };
    }
}

typedef Roll = {
    var sidenum:Int;
    var result:Int;
}