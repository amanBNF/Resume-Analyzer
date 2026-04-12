const mongoose = require('mongoose');

/*
Interview Report Model
1. Job Description : string
2. resume text : string
3. self description : string

match score : number

Generated interview report
1. technical questions : [{
    question: "",
    intention: "",
    answer: "",
}]
2. behavioral questions : [{
    question: "",
    intention: "",
    answer: "",
}]
3. skill gap analysis : [{
    skill: "",
    severity : {
        type: String,
        enum: ['low', 'medium', 'high']
    }
}]
4. study plan : [{
    day : number,
    focus : string,
    tasks : [string]
}]
*/

const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type: String,
        required: true
    },
    intention : {
        type: String,
        required: true
    },
    answer : {
        type: String,
        required: true
    }
},{
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question : {
        type: String,
        required: true
    },
    intention : {
        type: String,
        required: true
    },
    answer : {
        type: String,
        required: true
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill : {
        type: String,
        required: true
    },
    severity : {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    }
},{
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day : {
        type: Number,
        required: true
    },
    focus : {
        type: String,
        required: true
    },
    tasks : [{
        type: String,
        required: true
    }]
},{
    _id: false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type: String,
        required: true
    },
    resume : {
        type: String,
    },
    selfDescription : {
        type: String,
    },
    matchScore : {
        type: Number,
        min : 0,
        max : 100
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGapAnalysis : [skillGapSchema],
    preparationPlan : [preparationPlanSchema],
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
},{
    timestamps: true
})

const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = interviewReportModel;