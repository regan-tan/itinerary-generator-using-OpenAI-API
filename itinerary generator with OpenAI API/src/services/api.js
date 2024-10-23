import axios from 'axios';

class ApiService {
  constructor(apiKey) {
    this.openaiApi = axios.create({
      baseURL: 'https://api.openai.com/v1',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async generateItinerary(params) {
    const prompt = `Create a ${params.days}-day itinerary for ${params.destination}. 
    Return ONLY a JSON array where each element represents a day with the following structure:
    {
      "day": number,
      "schedule": [
        {
          "time": "HH:MM",
          "activity": "description",
          "location": "place name"
        }
      ]
    }
    
    Consider these interests: ${params.interests}
    Budget level: ${params.budget}`;

    try {
      const response = await this.openaiApi.post('/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are a travel planner. Always respond with valid JSON only. No additional text or explanations." 
          },
          { 
            role: "user", 
            content: prompt 
          }
        ]
      });

      const content = response.data.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error?.message || 'Failed to generate itinerary');
      }
      throw error;
    }
  }
}

export default ApiService;