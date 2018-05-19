/* This script takes two JSON files, loops though them and merges each object together, then adds the 
merged data to the database. */

const mongodb = require("mongodb");
const async = require("async");
const path = require("path");
const fs = require("fs");

let customerData = JSON.parse(fs.readFileSync("./m3-customer-data.json", "utf8"));
let customerAddressData = JSON.parse(fs.readFileSync("./m3-customer-address-data.json", "utf8"));
let mergedData = [];

const numObjects = customerData.length;
let numObjectsAtATime;

const defaultNumObjectsAtATime = Math.ceil(numObjects/10);

// If number of objects at a time is missing or invalid, set a default value.
if (!process.argv[2] || process.argv[2] <= 0 || process.argv[2] > numObjects) {
    numObjectsAtATime = defaultNumObjectsAtATime;
}
else {
    numObjectsAtATime = Math.ceil(process.argv[2]);
}

const numQueries = Math.ceil(numObjects/numObjectsAtATime);

const url = "mongodb://localhost:27017/edx-course-db";
let tasks = [];

// Merge customer data with address data into mergedData array
customerData.forEach((obj, index) => {
    mergedData.push(Object.assign(obj, customerAddressData[index]));
});

// Start database
mongodb.MongoClient.connect(url, {useNewUrlParser: true}, (error, client) => {
    if (error) return process.exit(1);
    const db = client.db("edx-course-db");

    let createTask = (chunkOfData, i, numQueries) => {
        return (callback) => {
            db.collection("accountstwooo").insertMany(chunkOfData, (error, results) => {
                if (error) return next(error);
                console.log(`Added chunk #${i + 1} of ${numQueries} to database`)
            });
            callback();
        } 
    }

    // Get chunks of data by specified number of objects at a time (numObjectsAtATime)
    for (i = 0; i < numQueries; i++) {
        let chunkOfData;
        let startIndex = i * numObjectsAtATime;
        let endIndex = startIndex + numObjectsAtATime;

        if (endIndex > numObjects) {
            const prevEndIndex = endIndex - numObjectsAtATime;
            startIndex = prevEndIndex;
            endIndex = numObjects;
            chunkOfData = mergedData.slice(startIndex, endIndex);
        }
        else {
            chunkOfData = mergedData.slice(startIndex, endIndex);
        }

        tasks.push(createTask(chunkOfData, i, numQueries));
    }

    async.parallel(tasks, (error, results) => {
        if (error) return error;
        client.close();
    });

});

