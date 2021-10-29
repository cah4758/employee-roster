const Employee = require('./employeeClass');

module.exports = class Manager extends Employee {
    constructor (empName, id, email, officeNum){
        super(empName, id, email);
        this.officeNum = officeNum;
    }
        getRole() {
            return "Manager"
        }
        getNumber() {
            return this.officeNum;
        }
};