"use strict";

// Declaration of modules
const globals = require("../utils/global.js");
const { createEmployee, showEmployeeCoincideNumber } = require("../service/coincidenceService.js");

/**
 * load the employees registered in the txt.  
 * @param {String} data The employee data txt
 */
exports.getEmployees = (data) => {
    let employees = [];
    if (this.isValidData(data)) {
        let employeesData = this.splitDataEmployees(data);
        employeesData.forEach(employeeData => {
            let employee = createEmployee(employeeData);
            employees.push(employee);
        });
        return employees;
    }
    console.log("\n Employee data error")
    return null;
}

/**
 * validates that the file data has the correct structure
 * @param {String} data The employee data txt
 * @returns {Boolean}
 */
exports.isValidData = (data) => {
    if (data == "") return false
    let dataSplitReg = this.splitDataEmployees(data);
    let dataValidated = dataSplitReg != null ? dataSplitReg.length : 0;
    let dataSplit = data.split("\n").length;
    return dataSplit == dataValidated;
}

/**
 * separate information for each employee
 * @param {String} data The employee data txt
 * @returns {Array<String>} split employee data
 */
exports.splitDataEmployees = (data) => {
    data = data.replace(' ','')
    return data.match(globals.regExpEmployee);
}

/**
 * calculate how often employees registered in the txt have coincided in the office.  
 */
exports.printEnployeeCoincidence = (employees) => {
    showEmployeeCoincideNumber(employees);
}