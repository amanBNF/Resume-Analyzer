const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const interviewController = require('../controller/interview.controller');
const upload = require('../middleware/file.middleware');


const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @desc Create a new interview
 * @access Private
 */

interviewRouter.post('/', authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController);

module.exports = interviewRouter;