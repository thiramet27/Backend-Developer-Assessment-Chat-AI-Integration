import mongoose from "mongoose";

export const conversationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }],
  tokensUsed: { type: Number, default: 0 },
});

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;