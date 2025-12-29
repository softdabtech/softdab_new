const fs = require('fs');
const path = require('path');

describe('keyword_check_local.js', () => {
  test('contains EXPECTED_LOCALES', () => {
    const content = fs.readFileSync(path.resolve(__dirname, '../keyword_check_local.js'), 'utf8');
    expect(content.includes('EXPECTED_LOCALES')).toBe(true);
    expect(content.includes("en-GB")).toBe(true);
    expect(content.includes("de-DE")).toBe(true);
  });
});
