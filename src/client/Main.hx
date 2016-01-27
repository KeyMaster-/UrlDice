package client;
import client.DiceParser.ParsingError;

class Main {
    public static function main() {

        var doc = js.Browser.window.document;

        var input = js.Browser.location.pathname;

        var base_url = doc.getElementById('base').attributes.getNamedItem('href').value;
        input = input.substr(base_url.length);
        var dice_regex = ~/^\(*(\d+d\d+|\d+)([+\-*\/]\(*(\d+d\d+|\d+)\)*)*\)*$/i;
        var input_correct = dice_regex.match(input);

        var parser = new DiceParser(byte.ByteData.ofString(input));
        var dice_result = 0.0;
        var error_message = 'Your input was incorrect, ';
        try{
            dice_result = parser.parse();
        }
        catch(e:ParsingError) {
            input_correct = false;
            switch(e) {
                case ParsingError.ParenMismatch:
                    error_message += 'you either forgot a bracket, or have too many.';
                case ParsingError.NotEnoughOperands:
                    error_message += 'you may have forgotten a number or dice roll in your input.';
                case ParsingError.EvalStackTooBig | ParsingError.TEoFInEvalStack:
                    error_message = 'Something went wrong here.<br>' +
                        'Please tweet the url you typed in, what browser you\'re using and the number $e to <a href="https://www.twitter.com/Keymaster_">@Keymaster_</a> and I will try to fix this. Thank you!';
            }
        }

        // js.Browser.window.history.pushState(null, "DiceUrl", '$input');

        var div = doc.createDivElement();
        div.align = 'center';
        div.innerHTML = '<h1>Result: $dice_result</h1>';
        doc.body.appendChild(div);

        if(!input_correct) {
            div = doc.createDivElement();
            div.align = 'center';
            div.innerHTML = error_message += '<br><br>';
            doc.body.appendChild(div);
        }

        var table = doc.createTableElement();
        table.align = 'center';
        var row = cast(table.insertRow(), js.html.TableRowElement);
        var cell = row.insertCell();
        cell.innerHTML = '<b>Die</b>';
        cell = row.insertCell();
        cell.innerHTML = '<b>Value</b>';
        
        for(key in parser.rolls.keys()) {
            row = cast(table.insertRow(), js.html.TableRowElement);
            cell = row.insertCell();
            cell.innerHTML = '$key';
            cell = row.insertCell();
            cell.innerHTML = parser.rolls.get(key).join(', ');
        }

        doc.body.appendChild(table);
    }
}