const Employee = require('../lib/employeeClass');

describe('Visibility', () => {
  it('Gives an employee the initial role of "employee"', () => {
    const newEmp = new Employee;
    const getRole = newEmp.getRole()
    expect(getRole).toBe("employee");
    });
});