const { expect } = require('chai');

const {
  getBindingFromMediaTypes,
  createPowerString,
} = require('../../../server/APIs/product-advertising.api');

describe('product-advertising.api', () => {
  describe('getBindingFromMediaTypes', () => {
    it('handles `ebook`', () => {
      const mediaTypes = ['ebook'];

      const expectedOutput = ['kindle'];
      const actualOutput = getBindingFromMediaTypes(mediaTypes);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('handles `print`', () => {
      const mediaTypes = ['print'];

      const expectedOutput = ['hardcover', 'paperback'];
      const actualOutput = getBindingFromMediaTypes(mediaTypes);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('handles `ebook` and `audiobook`', () => {
      const mediaTypes = ['ebook', 'audiobook'];

      const expectedOutput = ['kindle', 'audible'];
      const actualOutput = getBindingFromMediaTypes(mediaTypes);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('handles all 3 types', () => {
      const mediaTypes = ['ebook', 'audiobook', 'print'];

      const expectedOutput = ['hardcover', 'paperback', 'kindle', 'audible'];
      const actualOutput = getBindingFromMediaTypes(mediaTypes);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });
  });

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
});
