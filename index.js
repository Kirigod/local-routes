const http = require("http");
const fs = require("fs");
const path = require("path");

const host = 'localhost';
const port = 3000;

const terminal = {
    red: '\x1b\[31m',
    blue: '\x1b\[34m',
    white: '\x1b\[37m'
};

const results = [];

function DirectoryFilter(DirectoryPath){
    
    try{
        
        const dirs = fs.readdirSync(DirectoryPath);
    
        for(let index=0; index < dirs.length; index++){
            
            if(fs.statSync(path.join(DirectoryPath, dirs[index])).isDirectory()){
                
                DirectoryFilter(path.join(DirectoryPath, dirs[index]));
        
            }else if(fs.statSync(path.join(DirectoryPath, dirs[index])).isFile()){

                results.push(path.join(DirectoryPath, dirs[index]))
        
            };
    
        };

        return results;

    }catch(error){
        
        return terminal.red + error + terminal.white;
    
    };

};


function Verify(DirectoryPath, Path, Main){
    
    return new Promise((resolve, reject) => {
        
        try{
            
            Path = Path.replace(/\\/g, '/');
            DirectoryPath = DirectoryPath.replace(/\\/g, '/');
            if(Main !== undefined) Main = Main.replace(/\\/g, '/');
            
            if(fs.existsSync(DirectoryPath) === false){
                
                reject(terminal.white + "Error: " + terminal.red + DirectoryPath + terminal.white + " not found!");
            
            }else if(fs.existsSync(Path) === false){
                
                reject(terminal.white + "Error: " + terminal.red + Path + terminal.white + " not found!");
            
            }else if(Main !== undefined && fs.existsSync(Main) === false){
                
                reject(terminal.white + "Error: " + terminal.red + Main + terminal.white + " not found!");
            
            }else{
                
                if(fs.statSync(path.join(DirectoryPath)).isDirectory() === false){
                    
                    reject(terminal.white + "Error: " + terminal.red + DirectoryPath + terminal.white + " is not a directory!");
                
                }else if(fs.statSync(path.join(Path)).isDirectory() === false){
                    
                    reject(terminal.white + "Error: " + terminal.red + Path + terminal.white + " is not a directory!");
                
                }else if(Main !== undefined && fs.statSync(path.join(Main)).isFile() === false){
                    
                    reject(terminal.white + "Error: " + terminal.red + Path + terminal.white + " is not a file!");
                
                }else{

                    if(DirectoryPath.startsWith(Path) === false) return reject(terminal.white + "Error: " + terminal.red + "Unexpected input!" + terminal.white)

                    resolve(DirectoryFilter(DirectoryPath));
            
                };
        
            };
    
        }catch(error){
            
            reject(terminal.red + error + terminal.white);
        
        };
    
    });

};


function initServer(Directory, Path, Main){
    
    try{
        
        Verify(Directory, Path, Main).then(data => {
            
            const routes = [];
            const URL = [];
            const _GET = [];
            
            if(Main !== undefined){
                
                fs.readFile(path.join(Main), function (error, fileContent){
                    
                    if(error) return console.log(terminal.red + error + terminal.white);
                    
                    _GET.push({ content: fileContent.toString("UTF-8") });
                
                });
            
            };
        
            for(let index=0; index < data.length; index++){
                
                routes.push(data[index].replace(Path, '').replace(/\\/g, '/'));
            
                fs.readFile(path.join(data[index]), function (error, fileContent){
                    
                    if(error) return console.log(terminal.red + error + terminal.white);
                
                    URL.push({ url: data[index].replace(Path, '').replace(/\\/g, '/'), content: fileContent.toString("UTF-8") });
            
                });
        
            };
        
            const server = http.createServer((request, response) => {
                
                const Index = routes.indexOf(request.url.replace(/\\/g, '/'));
            
                if(request.url === "/" && Main !== undefined){

                    response.writeHead(200);
                    response.end(_GET[0].content);

                }else if(Index > -1){
                    
                    const searchURL = URL.findIndex((search) => search.url == request.url);
                
                    response.writeHead(200);
                    response.end(URL[searchURL].content);
            
                }else{
                    
                    response.writeHead(404);
                    response.end("<h1>404 Not Found</h1>");
            
                };
        
            });
        
            server.listen(port, host, () => {
                
                console.log(`Server running on ${terminal.red}http:${terminal.blue}//${host}:${port}${terminal.white}`);
        
            });
    
        }).catch(error => {
            
            return console.log(terminal.red + error + terminal.white);
    
        });

    }catch(error){
        
        return console.log(terminal.red + error + terminal.white);

    };
    
};


module.exports.initServer = initServer;