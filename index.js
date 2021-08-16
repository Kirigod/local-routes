const http = require("http");
const fs = require("fs");
const path = require("path");

const default_options = {
    host: "localhost",
    port: 3000
};


function run(Input){

    let options = {};

    try{
        
        if(!Input.dirname) return console.log(new Error("Dirname not found!"));
        if(fs.statSync(path.join(Input.dirname)).isDirectory() === false) return console.log(new Error(`${Input.dirname.replace(/\\/g, '/')} is not a directory!`));
        options.dirname = Input.dirname;
    
        if(Input.host) options.host = Input.host;
        if(!Input.host) options.host = default_options.host;
    
        if(Input.port) options.port = Input.port;
        if(!Input.port) options.port = default_options.port;

    }catch{
        return console.log("Invalid input!");
    };

    const server = http.createServer((request, response) => {
        try{
            
            if(fs.existsSync(options.dirname + request.url) === false || fs.statSync(path.join(options.dirname + request.url)).isFile() === false){
                response.writeHead(404);
            
                fs.readFile(path.join(__dirname + "/404.html"), function (error, data){
                    
                    if(error){
                        response.end("404 Not Found");
                        return console.log("404 Not Found");
                    };
                
                    response.end(data);
            
                });
        
            }else{
                fs.readFile(path.join(options.dirname + request.url), function (fileError, file){
                    
                    if(fileError){
                        response.writeHead(500);
                        fs.readFile(path.join(__dirname + "/500.html"), function (error, data){
                            
                            if(error){
                                response.end("500 Internal Server Error");
                                return console.log("Internal Server Error");
                            };
                        
                            response.end(data);
                    
                        });
                
                    }else{

                        response.writeHead(200);
                        response.end(file);
                
                    };
                });
            };
        
        }catch{
            response.writeHead(500);
            fs.readFile(path.join(__dirname + "/500.html"), function (error, data){
                
                if(error){
                    response.end("500 Internal Server Error");
                    return console.log("Internal Server Error");
                };
                
                response.end(data);
            
            });
        };
    });

    server.listen(options.port, options.host, () => {
        console.log(`Server running on http://${options.host}:${options.port}`);
    });

};


module.exports.run = run;
