const EmployeeController = require("../src/controller/employeeController.js");
const Employee = require("../src/models/employee.js");


describe("Validate Employee Controller", () => {
    it.each([
        [
            "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
                "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00\n" +
                "ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
            true
        ],
        [
            "RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
            true
        ],
        [
            "RENE=EY10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00", //format invalid day
            false
        ],
        [
            "RENE=MO125:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00", // format invalid hour
            false
        ],
    ])('Valid Correct Data format: %p expecting %p', (testData, result) => {
        let expectedResult = EmployeeController.isValidData(testData)
        expect(expectedResult).toEqual(result);
    });
    it.each([
        [
            "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00\n" +
            "ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00"
        ],
        [
            "RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
        ],
    ])('The result should be an array of Employee %p', (testData) => {
        let expectedResult = EmployeeController.getEmployees(testData)
        expect(expectedResult).toBeInstanceOf(Array);
        expect(expectedResult[0]).toBeInstanceOf(Employee);
    });
})