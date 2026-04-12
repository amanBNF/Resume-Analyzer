const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

async function generateInterviewReportController(req, res){

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText(); // Extract text content from the PDF buffer
    const {selfDescription, jobDescription} = req.body;

    // Here you can implement the logic to generate the interview report using the resumeContent, selfDescription, and jobDescription.
    // For example, you can use a language model to analyze the resume and generate a report based on the provided information.

    const interviewReportByAi = await generateInterviewReport({
        resume : resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user : req.user.id,
        resume : resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        success : true,
        message : "Interview report generated successfully",
        interviewReport
    })
}

module.exports = {generateInterviewReportController};