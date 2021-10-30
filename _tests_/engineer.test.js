const Engineer = require('../lib/engineerExt');

describe('Engineer Role', () => {
  it('Gives an engineer the role of "engineer"', () => {
    const eng = new Engineer;
    const getRole = eng.getRole()
    expect(getRole).toBe("Engineer");
    });
});