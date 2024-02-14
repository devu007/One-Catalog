import axios, { AxiosRequestConfig } from 'axios';

type ChatGPTResponse = {
  choices: { message: { content: string } }[];
};

const getChatGPTResponse = async (prompt: string): Promise<string> => {
  const apiKey = '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'; // Replace with your actual OpenAI API key

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  };

  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const response = await axios(config);

    const responseData: ChatGPTResponse = response.data;
    const responseText = responseData.choices[0]?.message.content || '';

    return responseText.trim();
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    throw error;
  }
};

export default getChatGPTResponse;