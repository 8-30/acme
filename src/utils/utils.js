"use strict";

const dayList = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

exports.buildDate = (day, time) => {
    let date = new Date();
    let hour = time.split(":");
    let numberDay = date.getUTCDay();
    let newNumberDay = dayList.indexOf(day) - numberDay;
    date.setDate(date.getUTCDate() + newNumberDay);
    date.setUTCHours(hour[0], hour[1], 0, 0);
    return date;
}

exports.fixDate = (initDate, endDate) => {
    if (initDate.getTime() > endDate.getTime()) {
        endDate.setUTCDate(endDate.getUTCDate() + 1);
    }
    return endDate;
}

exports.inDateRange = (date, minDate, maxDate) => {
    return date.getTime() >= minDate.getTime() && date.getTime() <= maxDate.getTime();
}