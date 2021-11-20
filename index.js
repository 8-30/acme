"use strict";

// Declaration of modules
const readline = require('readline');
const fs = require('fs');
const { getEmployeeCoincidence, print } = require('./src/controller/employeeController');

// Creates the interface for reading data
var readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


// reads the path to the file  (default: test/employees.txt)
readInterface.question("Please enter the file path(default: test/employees.txt) => ", (path) => {
    let filename = path != "" ? path : "test/employees.txt";

    //read the file 
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            console.log("\n Error loading the file\n", err.message);
            readInterface.close();
            throw err;
        }

        //Call the function to calculate how often employees registered in the txt have coincided in the office.
        const employees = getEmployeeCoincidence(data);
        if (employees != null) {
            print(employees);
        }
        readInterface.close();
    });
});

// print the process finish.
readInterface.on("close", function() {
    console.log("\nProcess completed successfully");
    process.exit(0);
});