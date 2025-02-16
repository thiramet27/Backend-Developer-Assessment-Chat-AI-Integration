const TokenService = {
    deductTokens: (user, tokens) => {
      if (user.tokens < tokens) {
        throw new Error('Not enough tokens');
      }
      user.tokens -= tokens;
      return user.save();
    },
  };
  
  module.exports = TokenService;
  