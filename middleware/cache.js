const cache = require('memory-cache');

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedData = cache.get(key);

  if (cachedData) {
    // If data is cached, send it
    res.json(cachedData);
  } else {
    // If not cached, proceed with the request
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.put(key, body, 5 * 60 * 1000); // Cache for 5 minutes
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = cacheMiddleware;
