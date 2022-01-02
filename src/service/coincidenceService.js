"use strict";

// Declaration of modules
const globals = require("../utils/global.js");
const Employee = require("../models/employee.js");
const utils = require("../utils/utils.js");
const WorkSchedule = require("../models/workSchedule.js");

/**
 * creates an instance of the Employee object
 * @param {String} data employee data
 * @returns {Employee} intance of Employee
 */
exports.createEmployee = (data) => {
    let objEmployee = new Employee();
    let employeeName = data.split("=")[0]
    objEmployee.setName(employeeName ? employeeName : "undefine");
    data.match(globals.regExpSchedule).forEach(element => {
        objEmployee.getWorkSchedule().push(this.createWorkSchedule(element));
    });
    return objEmployee;
}

/**
 * creates an instance of the working day object
 * @param {String} data information about work schedule
 * @returns {WorkSchedule} intance of WorkSchedule
 */
exports.createWorkSchedule = (data) => {
    const hours = data.match(globals.regExpHour);
    const day = data.match(globals.regExpDay);
    let objWorkSchedule = new WorkSchedule(day[0])
    const entryHour = utils.buildDate(objWorkSchedule.getDay(), hours[0]);
    let exitHour = utils.buildDate(objWorkSchedule.getDay(), hours[1]);
    objWorkSchedule.setEntryHour(entryHour)
    objWorkSchedule.setExitHour(utils.fixDate(entryHour, exitHour));
    return objWorkSchedule;
}

/**
 * Calculate how often employees registered in the txt have coincided in the office.  
 * @param {Employee} Employees instance of Employee
 */
exports.showEmployeeCoincideNumber = (Employees) => {
        for (let i = 0; i < Employees.length; i++) {
            let sum = 0;
            let employee1 = Employees[i];
            let objWorkSchedule1 = employee1.getWorkSchedule();
            for (let j = i; j < Employees.length; j++) {
                if (i != j) {
                    let employee2 = Employees[j];
                    let objWorkSchedule2 = employee2.getWorkSchedule();
                    sum = compareWorkSchedule(objWorkSchedule1, objWorkSchedule2)
                    console.log("\nLa coincidencia entre " + employee1.getName() + "-" + employee2.getName() + " es:" + sum)
                }
            }


        }

        return;

    }
    /**
     * Compare de work days searching coincidences.
     * @param {WorkSchedule} WorkSchedule1 instance of WorkHour
     * * @param {WorkSchedule} WorkSchedule2 instance of WorkHour
     * @returns number of Schedule coincidences 
     */

function compareWorkSchedule(WorkSchedule1, WorkSchedule2) {
    let sum = 0;
    WorkSchedule1.forEach((element) => {
        WorkSchedule2.forEach((element2) => {
            if (element.getDay() == element2.getDay()) {
                if (utils.inDateRange(element.getEntryHour(), element2.getEntryHour(), element2.getExitHour()) ||
                    utils.inDateRange(element2.getEntryHour(), element.getEntryHour(), element.getExitHour())) {
                    sum++
                }
            }

        })
    })
    return sum;
}