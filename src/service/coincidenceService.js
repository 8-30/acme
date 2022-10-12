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
    objEmployee.setName(employeeName ? employeeName : "undefined");
    data.match(globals.regExpSchedule).forEach(scheduleInfo => {
        objEmployee.getWorkSchedule().push(this.createWorkSchedule(scheduleInfo));
    });
    return objEmployee;
}

/**
 * creates an instance of the working day object
 * @param {String} scheduleInfo information about work schedule
 * @returns {WorkSchedule} intance of WorkSchedule
 */
exports.createWorkSchedule = (scheduleInfo) => {
    let hours = scheduleInfo.match(globals.regExpHour);
    let day = scheduleInfo.match(globals.regExpDay);
    let objWorkSchedule = new WorkSchedule(day[0])
    let entryHour = utils.buildDate(objWorkSchedule.getDay(), hours[0]);
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
        for (let employeeAIndex = 0; employeeAIndex < Employees.length; employeeAIndex++) {
            let sum = 0;
            let employeeA = Employees[employeeAIndex];
            let objWorkScheduleA = employeeA.getWorkSchedule();
            for (let employeeBIndex = employeeAIndex; employeeBIndex < Employees.length; employeeBIndex++) {
                if (employeeAIndex != employeeBIndex) {
                    let employeeB = Employees[employeeBIndex];
                    let objWorkScheduleB = employeeB.getWorkSchedule();
                    sum = compareWorkSchedule(objWorkScheduleA, objWorkScheduleB)
                    console.log("\nLa coincidencia entre " + employeeA.getName() + "-" + employeeB.getName() + " es:" + sum)
                }
            }
        }
        return;
    }

/**
 * Compare work days searching coincidences.
 * @param {WorkSchedule} workScheduleA instance of WorkHour
 * @param {WorkSchedule} workScheduleB instance of WorkHour
 * @returns number of Schedule coincidences 
 */
function compareWorkSchedule(workScheduleA, workScheduleB) {
    let sum = 0;
    workScheduleA.forEach((workScheduleADate) => {
        workScheduleB.forEach((workScheduleBDate) => {
            if (workScheduleADate.getDay() == workScheduleBDate.getDay()) {
                if (utils.inDateRange(workScheduleADate.getEntryHour(), workScheduleBDate.getEntryHour(), workScheduleBDate.getExitHour()) ||
                    utils.inDateRange(workScheduleBDate.getEntryHour(), workScheduleADate.getEntryHour(), workScheduleADate.getExitHour())) {
                    sum++
                }
            }
        })
    })
    return sum;
}