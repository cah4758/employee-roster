const Manager = require('../lib/managerExt');

describe('Manager Role', () => {
  it('Gives an Manager the role of "Manager"', () => {
    const man = new Manager;
    const getRole = man.getRole()
    expect(getRole).toBe("Manager");
    });
});