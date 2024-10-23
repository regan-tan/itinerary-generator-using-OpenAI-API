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
    const prompt = `Create a detailed ${params.days}-day itinerary for ${params.destination}. 
    Interests: ${params.interests}
    Budget: ${params.budget}
    
    Please include:
    - Daily activities with approximate times
    - Recommended restaurants
    - Estimated costs
    - Travel tips
    
    Format the response in a clear, day-by-day structure.`;

    try {
      const response = await this.openaiApi.post('/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      });

      return response.data.choices[0].message.content || 'No itinerary generated';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error?.message || 'Failed to generate itinerary');
      }
      throw error;
    }
  }
}

export default ApiService;