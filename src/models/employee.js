"use strict";

class Employee {
    constructor() {
        this._workSchedule = [];
    }
    setName(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    setWorkSchedule(workSchedule) {
        this._workSchedule = workSchedule;
    }
    getWorkSchedule() {
        return this._workSchedule;
    }
}

module.exports = Employee;