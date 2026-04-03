const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate matches the job requirements"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview"),
    skillGapAnalysis: z.array(z.object({
        skill: z.string().describe("The skill that needs to be improved"),
        severity: z.enum(['low', 'medium', 'high']).describe("The severity of the skill gap")
    })).describe("Analysis of skills that need improvement"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan"),
        focus: z.string().describe("The focus area for that day"),
        tasks: z.array(z.string()).describe("The tasks to be completed on that day")
    })).describe("A day-wise preparation plan for the interview")
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
You must return ONLY valid JSON strictly following this schema.

Do NOT add explanations or extra text.

Generate an interview report with:
- matchScore (0–100)
- At least 3 technicalQuestions
- At least 3 behavioralQuestions
- Skill gap analysis
- A 5-day preparation plan

Resume: ${resume}
Self description: ${selfDescription}
Job description: ${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    return JSON.parse(response.text)
}

module.exports = generateInterviewReport;