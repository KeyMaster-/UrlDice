package ;

class Main {
    public static function main() {

        var doc = js.Browser.window.document;

        var input = js.Browser.location.pathname;

        var base_url = doc.getElementById('base').attributes.getNamedItem('href').value;
        input = input.substr(base_url.length);
        var dice_regex = ~/^(\d+d\d+|\d+)([+\-*\/](\d+d\d+|\d+))*$/i;
        var matched_regex = dice_regex.match(input);
        if(!matched_regex) {
            input = "1d6";
        }

        var parser = new DiceParser(byte.ByteData.ofString(input));
        var dice_result = parser.parse();

        js.Browser.window.history.pushState(null, "DiceUrl", '$input');

        var div = doc.createDivElement();
        div.align = 'center';
        div.innerHTML = '<h1>Result: $dice_result</h1>';
        doc.body.appendChild(div);

        if(!matched_regex) {
            div = doc.createDivElement();
            div.align = 'center';
            div.innerHTML = '(Your input was incorrect, so we rolled a d6 for you)<br><br>';
            doc.body.appendChild(div);
        }

        var table = doc.createTableElement();
        table.align = 'center';
        var row = cast(table.insertRow(), js.html.TableRowElement);
        var cell = row.insertCell();
        cell.innerHTML = '<b>Die</b>';
        cell = row.insertCell();
        cell.innerHTML = '<b>Value</b>';
        
        for(roll in parser.rolls) {
            row = cast(table.insertRow(), js.html.TableRowElement);
            cell = row.insertCell();
            cell.innerHTML = '${roll.sidenum}';
            cell = row.insertCell();
            cell.innerHTML = '${roll.result}';
        }

        doc.body.appendChild(table);
    }
}