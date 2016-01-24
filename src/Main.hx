package ;

class Main {
    public static function main() {

        var input = js.Browser.location.pathname;
        input = input.substr(input.lastIndexOf("/") + 1);
        var doc = js.Browser.window.document;

        var parser = new DiceParser(byte.ByteData.ofString(input));
        var dice_result = parser.parse();

        var div = doc.createDivElement();
        div.innerHTML = 'Result: $dice_result';
        doc.body.appendChild(div);

        var table = doc.createTableElement();
        var row = cast(table.insertRow(), js.html.TableRowElement);
        var cell = row.insertCell();
        cell.innerHTML = 'Die';
        cell = row.insertCell();
        cell.innerHTML = 'Value';
        
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