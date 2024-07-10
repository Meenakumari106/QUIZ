// models/QuizResponse.js
const mongoose = require('mongoose');

const quizResponseSchema = new mongoose.Schema({
  'quiz-title':{type:String },
    'userId':{type:String ,required :true},
    'responses': [
    {
      questionId: {
       type:String,
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    }
  ],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QuizResponse', quizResponseSchema);
