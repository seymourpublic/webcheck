const { validationResult } = require('express-validator');
const WebsiteCheck = require('../models/WebsiteCheck');
const MozChecker = require('../utils/MozChecker');
const OpenAIChecker = require('../utils/OpenAIChecker');
const BacklinkChecker = require('../utils/BacklinkChecker');
const SecurityChecker = require('../utils/SecurityChecker');

const checkWebsite = async (req, res, next) => {
  try {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw { name: 'ValidationError', message: 'Validation Error', errors: errors.array() };
    }

    const {
      targetWebsite,
      mozAccessId = process.env.MOZ_ACCESS_ID,
      mozSecretKey = process.env.MOZ_SECRET_KEY,
      openaiApiKey = process.env.OPENAI_API_KEY,
    } = req.body;

    const mozChecker = new MozChecker(mozAccessId, mozSecretKey, targetWebsite);
    const openaiChecker = new OpenAIChecker(openaiApiKey, targetWebsite);
    const backlinkChecker = new BacklinkChecker(targetWebsite);
    const securityChecker = new SecurityChecker(targetWebsite);

    // Check Domain Authority
    const domainAuthority = await mozChecker.checkDomainAuthority();

    // Check Content
    const contentAnalysis = await openaiChecker.checkContent();

    // Check Backlinks
    const backlinkAnalysis = await backlinkChecker.checkBacklinks();

    // Check Security
    const securityAnalysis = await securityChecker.checkSecurity();

    // Determine if all checks passed
    const passedAllChecks = true; // Implement your logic for this based on actual checks

    // Save the results to MongoDB
    const websiteCheck = new WebsiteCheck({
      targetWebsite,
      domainAuthority,
      contentAnalysis,
      backlinkAnalysis,
      ...securityAnalysis,
      passedAllChecks,
    });
    await websiteCheck.save();

    res.json({
      domainAuthority,
      contentAnalysis,
      backlinkAnalysis,
      ...securityAnalysis,
      passedAllChecks,
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

module.exports = { checkWebsite };
