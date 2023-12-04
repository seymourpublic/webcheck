const mongoose = require('mongoose');

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

module.exports = WebsiteCheck;
