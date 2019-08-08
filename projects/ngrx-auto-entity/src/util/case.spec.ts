import { camelCase, lowerCase, lowerCaseFirst, noCase, pascalCase, upperCase, upperCaseFirst } from './case';

describe('lowerCase', () => {
  test('should convert null to empty string', () => {
    const result = lowerCase(null);
    expect(result).toBe('');
  });

  test('should convert undefined to empty string', () => {
    const result = lowerCase(undefined);
    expect(result).toBe('');
  });

  test('should convert upper case string to lower case', () => {
    const result = lowerCase('UPPER CASE');
    expect(result).toBe('upper case');
  });

  test('should convert lower case string to lower case', () => {
    const result = lowerCase('lower case');
    expect(result).toBe('lower case');
  });

  test('should convert capital case string to lower case', () => {
    const result = lowerCase('Capital Case');
    expect(result).toBe('capital case');
  });

  test('should convert camel case string to lower case', () => {
    const result = lowerCase('camelCase');
    expect(result).toBe('camelcase');
  });

  test('should convert pascal case string to lower case', () => {
    const result = lowerCase('PascalCase');
    expect(result).toBe('pascalcase');
  });
});

describe('upperCase', () => {
  test('should convert null to empty string', () => {
    const result = upperCase(null);
    expect(result).toBe('');
  });

  test('should convert undefined to empty string', () => {
    const result = upperCase(undefined);
    expect(result).toBe('');
  });

  test('should convert upper case string to upper case', () => {
    const result = upperCase('UPPER CASE');
    expect(result).toBe('UPPER CASE');
  });

  test('should convert lower case string to upper case', () => {
    const result = upperCase('lower case');
    expect(result).toBe('LOWER CASE');
  });

  test('should convert capital case string to upper case', () => {
    const result = upperCase('Capital Case');
    expect(result).toBe('CAPITAL CASE');
  });

  test('should convert camel case string to upper case', () => {
    const result = upperCase('camelCase');
    expect(result).toBe('CAMELCASE');
  });

  test('should convert pascal case string to upper case', () => {
    const result = upperCase('PascalCase');
    expect(result).toBe('PASCALCASE');
  });
});

describe('upperCaseFirst', () => {
  test('should convert null to empty string', () => {
    const result = upperCaseFirst(null);
    expect(result).toBe('');
  });

  test('should convert undefined to empty string', () => {
    const result = upperCaseFirst(undefined);
    expect(result).toBe('');
  });

  test('should convert first letter of upper case string to upper case', () => {
    const result = upperCaseFirst('UPPER CASE');
    expect(result).toBe('UPPER CASE');
  });

  test('should convert first letter of lower case string to upper case', () => {
    const result = upperCaseFirst('lower case');
    expect(result).toBe('Lower case');
  });

  test('should convert first letter of capital case string to upper case', () => {
    const result = upperCaseFirst('Capital Case');
    expect(result).toBe('Capital Case');
  });

  test('should convert first letter of camel case string to upper case', () => {
    const result = upperCaseFirst('camelCase');
    expect(result).toBe('CamelCase');
  });

  test('should convert first letter of pascal case string to upper case', () => {
    const result = upperCaseFirst('PascalCase');
    expect(result).toBe('PascalCase');
  });
});

describe('lowerCaseFirst', () => {
  test('should convert null to empty string', () => {
    const result = lowerCaseFirst(null);
    expect(result).toBe('');
  });

  test('should convert undefined to empty string', () => {
    const result = lowerCaseFirst(undefined);
    expect(result).toBe('');
  });

  test('should convert first letter of lower case string to lower case', () => {
    const result = lowerCaseFirst('UPPER CASE');
    expect(result).toBe('uPPER CASE');
  });

  test('should convert first letter of lower case string to lower case', () => {
    const result = lowerCaseFirst('lower case');
    expect(result).toBe('lower case');
  });

  test('should convert first letter of capital case string to lower case', () => {
    const result = lowerCaseFirst('Capital Case');
    expect(result).toBe('capital Case');
  });

  test('should convert first letter of camel case string to lower case', () => {
    const result = lowerCaseFirst('camelCase');
    expect(result).toBe('camelCase');
  });

  test('should convert first letter of pascal case string to lower case', () => {
    const result = lowerCaseFirst('PascalCase');
    expect(result).toBe('pascalCase');
  });
});

describe('noCase', () => {
  test('should return empty string for null', () => {
    const result = noCase(null);
    expect(result).toBe('');
  });

  test('should return empty string for undefined', () => {
    const result = noCase(undefined);
    expect(result).toBe('');
  });

  test('should return lower case words for lower case string', () => {
    const result = noCase('a lower case string');
    expect(result).toBe('a lower case string');
  });

  test('should return lower case words for upper case string', () => {
    const result = noCase('AN UPPER CASE STRING');
    expect(result).toBe('an upper case string');
  });

  test('should return lower case words for camel case string', () => {
    const result = noCase('aCamelCaseString');
    expect(result).toBe('a camel case string');
  });

  test('should return lower case words for odd camel case string', () => {
    const result = noCase('AOddCamelCaseString');
    expect(result).toBe('a odd camel case string');
  });

  test('should return lower case words for odd camel case string', () => {
    const result = noCase('ODDCamelCaseString');
    expect(result).toBe('odd camel case string');
  });

  test('should return lower case words for pascal case string', () => {
    const result = noCase('PascalCaseString');
    expect(result).toBe('pascal case string');
  });
});

describe('camelCase', () => {
  test('should return empty string for null', () => {
    const result = camelCase(null);
    expect(result).toBe('');
  });

  test('should return empty string for undefined', () => {
    const result = camelCase(undefined);
    expect(result).toBe('');
  });

  test('should return camel case string for lower case words', () => {
    const result = camelCase('a lower case string');
    expect(result).toBe('aLowerCaseString');
  });

  test('should return camel case string for upper case words', () => {
    const result = camelCase('AN UPPER CASE STRING');
    expect(result).toBe('anUpperCaseString');
  });

  test('should return camel case string for camel case words', () => {
    const result = camelCase('a Camel Case String');
    expect(result).toBe('aCamelCaseString');
  });

  test('should return camel case string for pascal case words', () => {
    const result = camelCase('A Pascal Case String');
    expect(result).toBe('aPascalCaseString');
  });

  test('should return camel case string for camel case string', () => {
    const result = camelCase('camelCase');
    expect(result).toBe('camelCase');
  });

  test('should return camel case string for camel case string', () => {
    const result = camelCase('PascalCase');
    expect(result).toBe('pascalCase');
  });
});

describe('pascalCase', () => {
  test('should return empty string for null', () => {
    const result = pascalCase(null);
    expect(result).toBe('');
  });

  test('should return empty string for undefined', () => {
    const result = pascalCase(undefined);
    expect(result).toBe('');
  });

  test('should return pascal case string for lower case words', () => {
    const result = pascalCase('a lower case string');
    expect(result).toBe('ALowerCaseString');
  });

  test('should return pascal case string for upper case words', () => {
    const result = pascalCase('AN UPPER CASE STRING');
    expect(result).toBe('AnUpperCaseString');
  });

  test('should return pascal case string for camel case words', () => {
    const result = pascalCase('a Camel Case String');
    expect(result).toBe('ACamelCaseString');
  });

  test('should return pascal case string for pascal case words', () => {
    const result = pascalCase('A Pascal Case String');
    expect(result).toBe('APascalCaseString');
  });

  test('should return pascal case string for camel case string', () => {
    const result = pascalCase('camelCase');
    expect(result).toBe('CamelCase');
  });

  test('should return pascal case string for camel case string', () => {
    const result = pascalCase('PascalCase');
    expect(result).toBe('PascalCase');
  });
});
