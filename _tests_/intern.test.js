const Intern = require('../lib/internExt');

describe('Intern Role', () => {
  it('Gives an Intern the role of "Intern"', () => {
    const int = new Intern;
    const getRole = int.getRole()
    expect(getRole).toBe("Intern");
    });
});