const axios = require('axios');
const cheerio = require('cheerio');
const robotsParser = require('robots-txt-parser');

class BacklinkChecker {
  constructor(targetWebsite) {
    this.targetWebsite = targetWebsite;
    this.robots = new robotsParser();
  }

  async checkBacklinks(websitesToCheck) {
    let backlinks = [];

    for (let website of websitesToCheck) {
      try {
        const robotsTxtUrl = new URL('/robots.txt', website).href;
        await this.robots.setUrl(robotsTxtUrl);

        if (this.robots.isAllowed(website, 'BacklinkChecker')) {
          const response = await axios.get(website);
          const $ = cheerio.load(response.data);
          $('a').each((i, link) => {
            const href = $(link).attr('href');
            if (href && href.includes(this.targetWebsite)) {
              backlinks.push(website);
            }
          });
        }
      } catch (error) {
        console.error(`Failed to fetch ${website}: ${error}`);
      }
    }

    return backlinks;
  }
}

module.exports = BacklinkChecker;