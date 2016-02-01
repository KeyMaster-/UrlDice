package client;
import client.DiceParser.ParsingError;
import js.html.HTMLDocument;
import client.DiceParser.RoundMode;
import js.JQuery.JQueryHelper;
import js.html.InputElement;
import js.html.KeyboardEvent;
using Lambda;

class Main {
    var doc:HTMLDocument;
    var input_field:InputElement;

    public static function main() {
        var main = new Main();
        main.first_run();
    }

    public function new() {
        doc = js.Browser.window.document;

        input_field = cast(doc.getElementById('notation_input'), InputElement);
        input_field.onkeydown = onInputKeydown;
    }

    public function first_run() {
        run(inputFromURL());
    }

    function onInputKeydown(e:KeyboardEvent) {
        if(e.keyCode == 13) {
            js.Browser.window.history.pushState(null, "DiceUrl", '${input_field.value}');
            run(input_field.value);
        }
    }

    function inputFromURL():String {
        var input = js.Browser.location.pathname;

        var base_url = doc.getElementById('base').attributes.getNamedItem('href').value;
        input = input.substr(base_url.length);

        //Clean up character codes, only works for characters with codes <= 255 right now
        var htmlCharcodeRegex = ~/%([0-9A-F]{1,2})/ig;
        input = htmlCharcodeRegex.map(input, function(reg:EReg) {
            return String.fromCharCode(Std.parseInt('0x' + reg.matched(1)));
        });

        input_field.value = input;

        return input;
    }

    function run(input:String) {
        
        var split_input = input.split("|");
        if(split_input.length > 2) {
            error('There should be no more than one | character in your input.');
            return;
        }
        input = split_input[0];

        if(input == '') {
            error('You didn\'t provide any input.');
            return;
        }

        var dice_regex = ~/^\(*(\d+d\d+|\d+)(([+\-*\/]|<|>|=|<=|>=)\(*(\d+d\d+|\d+)\)*)*\)*$/i;
        if(!dice_regex.match(input)) {
            error("Your input is incorrect, please check for errors.");
            return;
        }

        var parser = new DiceParser(byte.ByteData.ofString(input));

        if(split_input.length == 2 && split_input[1] != '') {
            var flags_regex = ~/r=(r|u|d|n)/i;
            if(flags_regex.match(split_input[1])) {
                switch(flags_regex.matched(1)) {
                    case 'r':
                        parser.roundMode = round;
                    case 'u':
                        parser.roundMode = up;
                    case 'd':
                        parser.roundMode = down;
                    case 'n':
                        parser.roundMode = none;
                }
            }
            else {
                error('Your flags were incorrect, please check for errors.');
                return;
            }
        }

        var dice_result = 0.0;
        try{
            dice_result = parser.parse();
        }
        catch(e:ParsingError) {
            var error_message = 'Your input was incorrect, ';
            switch(e) {
                case ParsingError.ParenMismatch:
                    error_message += 'you either forgot a bracket, or have too many.';
                case ParsingError.NotEnoughOperands:
                    error_message += 'maybe you forgot a number or dice roll, or you have too many operators?';
                case ParsingError.TooManyComparisons:
                    error_message += 'your input can\'t have more than one comparison.';
                case ParsingError.EvalStackTooBig | ParsingError.TEoFInEvalStack:
                    error_message = 'Something went wrong here.<br>' +
                        'Please tweet the url you typed in, what browser you\'re using and the number $e to <a href="https://www.twitter.com/Keymaster_">@Keymaster_</a> and I will try to fix this. Thank you!';
            }
            error(error_message);
        }

        success(dice_result, parser);
    }

    function success(result:Float, parser:DiceParser) {
        var headline = doc.getElementById('title_headline');

        var htmlString = 'Result: ';
        if(parser.isComparison) {
            htmlString += (result == 1) ? 'Test succeded' : 'Test failed';
        }
        else {
            htmlString += '$result';
        }
        headline.innerText = htmlString;

        var results_div = doc.getElementById("results_table");
        while(results_div.childNodes.length > 0) {
            results_div.removeChild(results_div.childNodes.item(0));
        }
        if(!parser.rolls.empty()) {
            var table = doc.createTableElement();
            table.align = 'center';
            var row = cast(table.insertRow(), js.html.TableRowElement);
            var cell = row.insertCell();
            cell.innerHTML = '<div align=\"left\"><b>Die</b></div>';
            cell = row.insertCell();
            cell.innerHTML = '<div align=\"center\"><b>Value</b></div>';
            
            for(key in parser.rolls.keys()) {
                row = cast(table.insertRow(), js.html.TableRowElement);
                cell = row.insertCell();
                cell.innerHTML = '$key';
                cell = row.insertCell();
                cell.innerHTML = parser.rolls.get(key).join(', ');
            }

            results_div.appendChild(table);
        }
    }

    function error(message:String) {
        var headline = doc.getElementById("title_headline");
        headline.innerText = message;
    }
}