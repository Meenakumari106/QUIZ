const mongoose = require('mongoose');

const UserResponseSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responses: { type: Map, of: String, required: true }, // Assuming responses are string-based
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserResponse', UserResponseSchema);
