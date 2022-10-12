const CoincidenceService = require("../src/service/coincidenceService.js");
const Employee = require("../src/models/employee.js");


describe("Validate Coincided Service", () => {
    it.each([
        ["RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00", "RENE"],
        ["ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00", "ASTRID"],
        ["ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00", "ANDRES"]
    ])('The result should an instance of Employee %p expecting %p', (testData, result) => {
        let expectedResult = CoincidenceService.createEmployee(testData)
        expect(expectedResult).toBeInstanceOf(Employee);
        expect(expectedResult.getName()).toEqual(result);
    });
    it.each([
        [
            "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00", 
            "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
            "\nLa coincidencia entre RENE-ASTRID es:2"
        ],
        [
            "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00", 
            "ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
            "\nLa coincidencia entre RENE-ANDRES es:2"
        ],
        [
            "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
            "ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
            "\nLa coincidencia entre ASTRID-ANDRES es:3"
        ],
    ])('The result should be the number of WorkSchedule coincidences between %p and %p expecting %p', (employeeTestData, employeeTestData2 ,result) => {
        let employeeTest = CoincidenceService.createEmployee(employeeTestData)
        let employeeTest2 = CoincidenceService.createEmployee(employeeTestData2)
        let employeeTestList = [employeeTest, employeeTest2];
        console.log = jest.fn()
        CoincidenceService.showEmployeeCoincideNumber(employeeTestList)
        expect(console.log).toHaveBeenCalledWith(result);
    });
})