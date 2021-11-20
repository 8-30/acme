const CoincidenceService = require("../src/service/coincidenceService.js");
const Employee = require("../src/models/employee.js");


describe("Validate Coincided Service", () => {
    test("The result should an instance of Employee", () => {
        let testData = "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00";
        const expectedResult = CoincidenceService.createEmployee(testData)
        expect(expectedResult).toBeInstanceOf(Employee);
        expect(expectedResult.getName()).toEqual("RENE");
    })

    test("The result should be the number of WorkSchedule coincidences ", () => {
        let employeeTestData = "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00";
        let employeeTestData2 = "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00";
        const employeeTest = CoincidenceService.createEmployee(employeeTestData)
        const employeeTest2 = CoincidenceService.createEmployee(employeeTestData2)
        let employeeTestList = [employeeTest, employeeTest2];
        console.log = jest.fn()
        CoincidenceService.showEmployeeCoincideNumber(employeeTestList)
        expect(console.log).toHaveBeenCalledWith("\nLa coincidencia entre RENE-ASTRID es:2");

    })

})