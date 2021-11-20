"use strict";
class WorkSchedule {

    constructor(day, entryHour, exitHour) {
        this._day = day;
        this._entryHour = entryHour;
        this._exitHour = exitHour;
    }
    getDay() {
        return this._day;
    }
    getEntryHour() {
        return this._entryHour;
    }
    getExitHour() {
        return this._exitHour;
    }
    setEntryHour(entryHour) {
        this._entryHour = entryHour;
    }
    setExitHour(exitHour) {
        this._exitHour = exitHour;
    }
}

module.exports = WorkSchedule;