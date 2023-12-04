const axios = require('axios');

class OpenAIChecker {
  constructor(apiKey, targetWebsite) {
    this.apiKey = apiKey;
    this.targetWebsite = targetWebsite;
  }

  async checkContent() {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt: `Analyzing the content of ${this.targetWebsite}`,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.data.choices[0].text;
    } catch (error) {
      throw new Error('Error checking content: ' + error.message);
    }
  }
}

module.exports = OpenAIChecker;
