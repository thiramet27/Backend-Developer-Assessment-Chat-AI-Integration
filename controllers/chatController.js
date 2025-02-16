import Conversation from '../models/Conversation.js';
import OpenAIService from '../services/openaiService.js';

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const user = req.user;

  if (!message || message.trim() === "") {
    return res.status(400).json({ message: 'Message cannot be empty' });
  }

  if (user.tokens <= 0) {
    return res.status(400).json({ message: 'No tokens left' });
  }

  const conversation = new Conversation({
    user: user._id,
    messages: [{ role: 'user', content: message }],
  });

  try {
    const aiResponse = await OpenAIService.sendMessage(message);

    conversation.messages.push({ role: 'assistant', content: aiResponse });

    const tokensUsed = aiResponse.length / 10;
    if (user.tokens < tokensUsed) {
      return res.status(400).json({ message: 'Insufficient tokens for this request' });
    }

    user.tokens -= tokensUsed; 
    await user.save(); 

    conversation.tokensUsed = tokensUsed;
    await conversation.save();

    res.status(200).json({
      message: aiResponse,
      conversationId: conversation._id,
      remainingTokens: user.tokens,
    });
  } catch (err) {
    console.error('Error processing message:', err);
    res.status(500).json({ message: 'Error in chat' });
  }
};

export const getChatHistory = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const conversation = await Conversation.findById(conversationId).populate('user');

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.status(200).json({
      conversation: {
        id: conversation._id,
        messages: conversation.messages,
      },
    });
  } catch (err) {
    console.error('Error fetching chat history:', err);
    res.status(500).json({ message: 'Error fetching chat history' });
  }
};

export const listConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ user: req.user._id }).sort('-updatedAt');

    res.status(200).json({
      conversations: conversations.map((conv) => ({
        id: conv._id,
        lastMessage: conv.messages[conv.messages.length - 1].content,
        updatedAt: conv.updatedAt,
      })),
    });
  } catch (err) {
    console.error('Error listing conversations:', err);
    res.status(500).json({ message: 'Error listing conversations' });
  }
};
