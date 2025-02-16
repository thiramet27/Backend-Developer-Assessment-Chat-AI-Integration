const rateLimit = {};
const RATE_LIMIT = 20;
const RESET_TIME = 3600000; // 1 hour in milliseconds

const rateLimiter = (req, res, next) => {
  const userId = req.user._id.toString();
  const currentTime = Date.now();

  if (!rateLimit[userId]) {
    rateLimit[userId] = { count: 1, lastRequestTime: currentTime };
  } else {
    if (currentTime - rateLimit[userId].lastRequestTime < RESET_TIME) {
      rateLimit[userId].count++;
    } else {
      rateLimit[userId] = { count: 1, lastRequestTime: currentTime };
    }
  }

  if (rateLimit[userId].count > RATE_LIMIT) {
    return res.status(429).json({ message: 'Rate limit exceeded' });
  }

  next();
};

export default rateLimiter;