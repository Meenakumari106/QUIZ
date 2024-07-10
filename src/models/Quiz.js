//define create-quiz schema
const mongoose = require("mongoose");


const quizSchema = new mongoose.Schema({

    userId: { type: String ,required:true},
     'quiz-title': { type: String, required: true },
     'quiz-description': String,
      'quiz-time-limit': Number, 
      'quiz-difficulty': String, 
      'quiz-scoring': String, 
      'quiz-access': String, 
      'quiz-password':String,
      questions: [{ text: { type: String, required: true }, 
        type: { type: String, required: true },
        answer:{type:String ,requires:true},
         options: [String] }] });
  
  //create Quizzes collection model
  const Quiz = mongoose.model('Quiz', quizSchema);

module.exports=Quiz;
