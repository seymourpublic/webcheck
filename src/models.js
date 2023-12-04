const mongoose = require('mongoose');

// Define a schema for storing website checks
const websiteCheckSchema = new mongoose.Schema({
  targetWebsite: String,
  domainAuthority: Number,
  contentAnalysis: String,
  backlinkAnalysis: String,
  sslAnalysis: {
    hasSSL: Boolean,
    sslCertificate: String,
  },
  phishingAnalysis: String,
  passedAllChecks: Boolean,
});

const WebsiteCheck = mongoose.model('WebsiteCheck', websiteCheckSchema);

module.exports = { WebsiteCheck };
