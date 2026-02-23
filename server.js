// & Essential Imports
import http from "http"
import crypto from "crypto"
import { readFile, writeFile } from "fs/promises";
import path from "path";


// * File at which data is stored
const DATA_FILE = path.join("data" , "links.json");

// * Function 
const serveFile = async(res , filePath , contentType) => {
     try{
       const data = await readFile(filePath);
       res.writeHead(200 , {'content-type': contentType});
       return res.end(data); 
    }
     catch(err){
         res.writeHead(404 , {'Content-type' :"text/html" });
         res.end("404 page not found")
    }

};

// ? Function to load the links
const loadLinks = async() => {
    try{
        const data = await readFile(DATA_FILE , 'utf-8');
        return JSON.parse(data);
    }
    catch(error){
        if(error.code === "ENOENT"){
          await writeFile(DATA_FILE, JSON.stringify({}));
            return {} ;
        }
        throw error ;
    }
}

// ? Functions to save the links
const saveLinks = async(links) => {
    await writeFile(DATA_FILE , JSON.stringify(links));
}


// * Creation of the https server
const server = http.createServer(async(req , res) => {
    console.log(req.url);
    
    // * Handling GET request
    if(req.method === "GET"){
        if(req.url === "/"){
           return serveFile(res ,"index.html" , "text/html" );
        }
        else if(req.url === "/style.css"){
             return serveFile(res ,"style.css" , "text/css" );
        }
       
        // * Making api to show links.json data in the frontend
        else if(req.url === "/links"){
            const links = await loadLinks();

            res.writeHead(200 , {'Content-type' : 'application/json'});
            return res.end(JSON.stringify(links));
        }
        else{
            const links = await loadLinks();
            const shortCode = req.url.slice(1);
            console.log("Link redirect " , req.url);
            if(links[shortCode]){
                // & 302 ==> Page found code
                res.writeHead(302 , {location : links[shortCode]}) ;
                return res.end();
            }
            //& 404 ===> ERROR
            res.writeHead(404 , {"Content-Type" : "text/plain"}) ;
            return res.end("Shortened URL Not found");
        }
    }
       
    // * POST Mehod to get data from user (Handling form Submissions)
        if(req.method === "POST" && req.url === "/shorten"){

            // ^ Variable declaration to  load tha links 
            const links = await loadLinks() ;
            let body = ""
            req.on("data" , (chunk) => {
                  body += chunk ;
            });
            req.on("end" , async() => {
                console.log(body);
                const {url , shortCode} = JSON.parse(body);

                if(!url){
                    res.writeHead(400 , {"Content-type" : "text/plain"});
                    return res.end("URL is required");
                }
                //  * Check for duplicate data 
                const finalShortCode = shortCode || crypto.randomBytes(4).toString('hex');
                if(links[finalShortCode]){
                    res.writeHead(400 , {"Content-type" : "text/plain"});
                    return res.end("Short code already exists. Please Choose Another");
                 }
                // * Adding data to links.json
                links[finalShortCode] = url ;
                await saveLinks(links) ;
                res.writeHead(200 , {"Content-type" : "application/json"});
                res.end(JSON.stringify({success : true , shortCode : finalShortCode}));
            });

        }
    }
);

// *  Server Listening
const PORT = process.env.PORT ||3000 ;
server.listen(PORT , '0.0.0.0' , () => {
    console.log( `Server is listening at http://localhost:${PORT}`)
});
