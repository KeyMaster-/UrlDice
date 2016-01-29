package server;

import js.node.Http;
import js.Node;
import js.Node.console;
import js.node.Path;
import js.node.Url;
import js.node.Fs;
class Main {
    static var listen_url = '127.0.0.1';
    static var listen_port = 8080;
    
    static function main() {
        Http.createServer(function(req, res) {
            var requestedFile = Path.basename(req.url);
            var content_type = 'text/html';
            if(requestedFile == 'favicon.ico') {
                content_type = 'image/x-icon';
            }
            else if(requestedFile != 'client.js') {
                requestedFile = 'index.html';
            }

            Fs.readFile(Path.resolve(Node.__dirname, requestedFile), function(err, data) {
                res.writeHead(200, {'Content-Type': content_type});
                res.write(data);
                res.end();
            });
        }).listen(listen_port, listen_url);
        console.log('server / Running at http://$listen_url:$listen_port/');
    }
}