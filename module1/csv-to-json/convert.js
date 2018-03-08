const fs = require("fs");
const path = require("path");

const file = process.argv[2];
const fileString = fs.readFileSync(file, "utf8");

// Takes in a string converted from a CSV and returns it in JSON format
const convertToJson = (string) => {

    const dataArray = string.split("\n");
    let finalArrayOfPeople = [];

    // Iterates through each line
    dataArray.forEach(line => {
        
        if (line !== "") {
        
            let person = line.split(",");

            // Builds a json object
            const json = {
                id: person[0],
                first_name: person[1],
                last_name: person[2],
                email: person[3],
                gender: person[4],
                ip_address: person[5],
                ssn: person[6],
                credit_card: person[7],
                bitcoin: person[8],
                street_address: person[9].split("\r")[0]
            };

            finalArrayOfPeople.push(json);
        }

    });

    return finalArrayOfPeople;
        
}

const convertedFile = convertToJson(fileString);

// Get the original filename, will be used to name the new JSON file
const newFileName = path.basename(file).split(".")[0];

// Writes to a file
fs.writeFileSync(`./data/json/${newFileName}.json`, JSON.stringify(convertedFile, null, 2));