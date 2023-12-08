const SecurityChecker = require('./SecurityChecker');
const SpamScanner = require('./SpamScanner');

jest.mock('./SpamScanner'); // Mock the SpamScanner module

describe('SecurityChecker', () => {
  test('should detect phishing', async () => {
    // Setup
    const mockScan = jest.fn();
    SpamScanner.mockImplementation(() => {
      return {
        getTokensAndMailFromSource: jest.fn().mockReturnValue(Promise.resolve('source')),
        scan: mockScan
      };
    });
    const securityChecker = new SecurityChecker('phishing.com');

    // Mock a phishing response
    mockScan.mockReturnValue(Promise.resolve({ isSpam: true }));

    // Execute
    const result = await securityChecker.scan();

    // Assert
    expect(result).toBe('Phishing detected');
  });
});