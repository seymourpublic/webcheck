const { checkWebsite } = require('../controllers/websiteCheckController');

describe('checkWebsite', () => {
  test('should return valid response for a valid request', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        targetWebsite: 'https://example.com',
        mozAccessId: 'mock_moz_access_id',
        mozSecretKey: 'mock_moz_secret_key',
        openaiApiKey: 'mock_openai_api_key',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    const next = jest.fn();

    // Call the controller function
    await checkWebsite(req, res, next);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test('should handle validation error for an invalid request', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        targetWebsite: 'invalid-url',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    const next = jest.fn();

    // Call the controller function
    await checkWebsite(req, res, next);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  // Add more test cases based on your application logic
});
