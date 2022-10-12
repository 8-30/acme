const regName = "[a-zA-Z]+";
const regDay = "(MO|TU|WE|TH|FR|SA|SU)";
const regHour = "(0?[0-9]|1[0-9]|2[0-3]|01[0-9]|02[0-9]):(0?[0-9]|[1-5][0-9])";
const regSchedule = `${regDay}(${regHour}-${regHour})`;
const regEmployee = `${regName}=(${regSchedule},)*(${regSchedule})$`;


const regExpDay = new RegExp(regDay, "g");
const regExpHour = new RegExp(regHour, "g");
const regExpEmployee = new RegExp(regEmployee, "gm");
const regExpSchedule = new RegExp(regSchedule, "g");

// 
module.exports.regExpDay = regExpDay;
module.exports.regExpHour = regExpHour;
module.exports.regExpEmployee = regExpEmployee;
module.exports.regExpSchedule = regExpSchedule;