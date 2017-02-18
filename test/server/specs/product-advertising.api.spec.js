const { expect } = require('chai');

const {
  createPowerString,
} = require('../../../server/APIs/product-advertising.api');

describe('createPowerString', () => {
  it('handles language', () => {
    const power = { language: 'english' };

    const expectedOutput = 'language:english';
    const actualOutput = createPowerString(power);

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('handles language and a single binding', () => {
    const power = { language: 'english', binding: ['audible'] };

    const expectedOutput = 'language:english and binding:audible';
    const actualOutput = createPowerString(power);

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('handles language and multiple bindings', () => {
    const power = {
      language: 'english',
      binding: ['audible', 'print', 'ebook']
    };

    const expectedOutput = 'language:english and binding:audible or print or ebook';
    const actualOutput = createPowerString(power);

    expect(actualOutput).to.deep.equal(expectedOutput);
  });
});
