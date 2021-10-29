const Employee = require('./employeeClass');

module.exports = class Intern extends Employee {
    constructor (empName, id, email, school){
        super(empName, id, email);
        this.school = school;
    }
        getRole() {
            return "Intern"
        }
        getSchool() {
            return this.school;
        }
};