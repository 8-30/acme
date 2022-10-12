"use strict";

// Declaration of modules
const readline = require('readline');
const fs = require('fs');
const { getEmployees, printEnployeeCoincidence} = require('./src/controller/employeeController');

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

        //Call the function to get data of Employees registered in the txt 
        const employees = getEmployees(data);
        if (employees != null) {
            //Call the function to calculate how often employees have coincided in the office.
            printEnployeeCoincidence(employees);
        }
        readInterface.close();
    });
});

// print the process finish.
readInterface.on("close", function() {
    console.log("\nProcess completed successfully");
    process.exit(0);
});