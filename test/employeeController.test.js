const EmployeeController = require("../src/controller/employeeController.js");
const Employee = require("../src/models/employee.js");


describe("Validate Employee Controller", () => {
    test("The result should be true if the data format is correct", () => {
        let testData = "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00\n" +
            "ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00";
        const expectedResult = EmployeeController.isValidData(testData)
        expect(expectedResult).toEqual(true);
    })
    test("The result should be false if the day doesnt exist or is invalid", () => {
        let testData = "RENE=EY10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00"
        const expectedResult = EmployeeController.isValidData(testData)
        expect(expectedResult).toEqual(false);
    })
    test("The result should be false if the hour doesnt exist or is invalid", () => {
        let testData = "RENE=MO125:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00"
        const expectedResult = EmployeeController.isValidData(testData)
        expect(expectedResult).toEqual(false);
    })
    test("The result should be an array of Employee", () => {
        let testData = "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00\n" +
            "ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00";
        const expectedResult = EmployeeController.getEmployeeCoincidence(testData)
        expect(expectedResult).toBeInstanceOf(Array);
        expect(expectedResult[0]).toBeInstanceOf(Employee);
    })
})