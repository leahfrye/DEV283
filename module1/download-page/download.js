const http = require("http");
const fs = require("fs");
const path = require("path");
const uuidv1 = require("uuid/v1");

// Gets data from a webpage and saves it in a new folder
const downloadPage = (url="http://nodeprogram.com") => {
    
    console.log("downloading ", url)
    
    // Gets data from a specified webpage url, saves to the buff variable, then returns it.
    const fetchPage = (urlF, callback) => {
        http.get(urlF, (response) => {
            let buff = "";
            response.on("data", (chunk) => {
                buff += chunk;
            });
            response.on("end", () => {
                callback(null, buff);
            });
        }).on("error", (error) => {
            console.error(`Got error: ${error.message}`);
            callback(error);    
        });
    }

    const folderName = uuidv1();
    fs.mkdirSync(folderName);
    
    // Creates a new folder with files containing the data from the specified webpage url
    fetchPage(url, (error, data) => {
        if (error) return console.log(error);
        fs.writeFileSync(path.join(__dirname, folderName, "url.txt"), url);
        fs.writeFileSync(path.join(__dirname, folderName, "file.html"), data);
        console.log("downloading is done in folder ", folderName);
    });

};

// Calls downloadPage() with a url provided in the command line
downloadPage(process.argv[2]);