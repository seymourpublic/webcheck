const MozChecker = require('./MozChecker');
const OpenAIChecker = require('./OpenAIChecker');
const BacklinkChecker = require('./BacklinkChecker');
const SecurityChecker = require('./SecurityChecker');

// Replace with your API keys and target website
const MOZ_ACCESS_ID = 'YOUR_MOZ_ACCESS_ID';
const MOZ_SECRET_KEY = 'YOUR_MOZ_SECRET_KEY';
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
const targetWebsite = 'https://example.com';

async function checkWebsite() {
  try {
    const mozChecker = new MozChecker(MOZ_ACCESS_ID, MOZ_SECRET_KEY, targetWebsite);
    const openaiChecker = new OpenAIChecker(OPENAI_API_KEY, targetWebsite);
    const backlinkChecker = new BacklinkChecker(targetWebsite);
    const securityChecker = new SecurityChecker(targetWebsite);

    // Check Domain Authority
    const domainAuthority = await mozChecker.checkDomainAuthority();
    console.log('Domain Authority:', domainAuthority);

    // Check Content
    const contentAnalysis = await openaiChecker.checkContent();
    console.log('Content Analysis:', contentAnalysis);

    // Check Backlinks
    const backlinkAnalysis = await backlinkChecker.checkBacklinks();
    console.log('Backlink Analysis:', backlinkAnalysis);

    // Check Security
    const securityAnalysis = await securityChecker.checkSecurity();
    console.log('Security Analysis:', securityAnalysis);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Execute the function
checkWebsite();
