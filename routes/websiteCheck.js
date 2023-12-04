const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { checkWebsite } = require('../controllers/websiteCheckController');

router.post(
  '/check-website',
  [
    check('targetWebsite').isURL().withMessage('Invalid URL format'),
    check('mozAccessId').optional().isAlphanumeric().withMessage('Invalid Moz Access ID'),
    check('mozSecretKey').optional().isAlphanumeric().withMessage('Invalid Moz Secret Key'),
    check('openaiApiKey').optional().isAlphanumeric().withMessage('Invalid OpenAI API Key'),
  ],
  checkWebsite
);

module.exports = router;
