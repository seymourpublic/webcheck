const axios = require('axios');

class MozChecker {
  constructor(accessId, secretKey, targetWebsite) {
    this.accessId = accessId;
    this.secretKey = secretKey;
    this.targetWebsite = targetWebsite;
  }

  async checkDomainAuthority() {
    try {
      const response = await axios.get(`https://lsapi.seomoz.com/v2/url-metrics?target=${this.targetWebsite}`, {
        auth: {
          username: this.accessId,
          password: this.secretKey,
        },
      });

      return response.data.domain_authority;
    } catch (error) {
      throw new Error('Error checking domain authority: ' + error.message);
    }
  }
}

module.exports = MozChecker;
