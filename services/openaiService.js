// OpenAIService.js
import axios from 'axios';

const sendMessage = async (message) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions', 
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to get response from OpenAI');
  }
};

export default { sendMessage }; // Make sure this is correct