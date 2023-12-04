const axios = require('axios');
const tld = require('tldjs');
const SpamScanner = require('spamscanner');


class SecurityChecker {
  constructor(targetWebsite) {
    this.targetWebsite = targetWebsite;
  }

  async checkSecurity() {
    const urlAnalysis = this.analyzeURL();
    const sslAnalysis = await this.checkSSL();

    // Check for phishing using Phishtank API
    const phishingAnalysis = await this.checkPhishing();

    return {
      urlAnalysis,
      sslAnalysis,
      phishingAnalysis,
    };
  }

  analyzeURL() {
    const urlParts = tld.parse(this.targetWebsite);
    const isIP = tld.getDomain(this.targetWebsite) === null;

    return {
      domain: urlParts.domain,
      subdomain: urlParts.subdomain,
      isIP,
    };
  }

  async checkSSL() {
    try {
      const response = await axios.get(this.targetWebsite);
      const { data } = response;

      const hasSSL = data.includes('https://');
      const sslCertificate = response.headers['x-amz-cf-pop'];

      return {
        hasSSL,
        sslCertificate,
      };
    } catch (error) {
      console.error('Error checking SSL:', error.message);
      return {
        hasSSL: false,
        sslCertificate: null,
      };
    }
  }

  async checkPhishing() {
    try {
      const scanner = new SpamScanner();
      const source = await scanner.getTokensAndMailFromSource(this.targetWebsite);
      const phishingAnalysis = await scanner.scan(source);
      return phishingAnalysis.isSpam ? 'Phishing detected' : 'No phishing detected';
    } catch (error) {
      console.error('Error checking phishing:', error);
      return 'Phishing check failed';
    }
  }
}

module.exports = SecurityChecker;
