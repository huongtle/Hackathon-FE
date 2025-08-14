const BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:4000/api';

export class ApiService {
  static async savePersonInfo(personData) {
    console.log(JSON.stringify(personData));
    try {
      const response = await fetch(`${BASE_URL}/person-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  }
}