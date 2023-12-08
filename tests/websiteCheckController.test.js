const { checkWebsite } = require('../controllers/websiteCheckController');

describe('checkWebsite', () => {
  test('should return valid response for a valid request', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        targetWebsite: 'https://www.leapwork.com/discover/web-automation?utm_term=automated%20web%20testing&utm_campaign=Web+Automation+ZA&utm_source=adwords&utm_medium=ppc&hsa_tgt=kwd-24326711&hsa_grp=153070378760&hsa_src=g&hsa_net=adwords&hsa_mt=b&hsa_ver=3&hsa_ad=663438693278&hsa_acc=9595272975&hsa_kw=automated%20web%20testing&hsa_cam=20301447488&gad_source=1&gclid=CjwKCAiAjrarBhAWEiwA2qWdCMRWjjHs8JX4NXmrjq6BKGLfd_9iOO7QU1KBB8KTeLRvHi7EOGZPBxoCrsQQAvD_BwE',
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

  test('should handle internal server error', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        targetWebsite: 'https://www.leapwork.com/discover/web-automation?utm_term=automated%20web%20testing&utm_campaign=Web+Automation+ZA&utm_source=adwords&utm_medium=ppc&hsa_tgt=kwd-24326711&hsa_grp=153070378760&hsa_src=g&hsa_net=adwords&hsa_mt=b&hsa_ver=3&hsa_ad=663438693278&hsa_acc=9595272975&hsa_kw=automated%20web%20testing&hsa_cam=20301447488&gad_source=1&gclid=CjwKCAiAjrarBhAWEiwA2qWdCMRWjjHs8JX4NXmrjq6BKGLfd_9iOO7QU1KBB8KTeLRvHi7EOGZPBxoCrsQQAvD_BwE',
        mozAccessId: 'mock_moz_access_id',
        mozSecretKey: 'mock_moz_secret_key',
        openaiApiKey: 'mock_openai_api_key',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    const next = jest.fn(() => {
      throw new Error('Mock error');
    });

    // Call the controller function
    await checkWebsite(req, res, next);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });
});
