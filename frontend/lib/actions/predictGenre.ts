import axios from 'axios';

const BACKEND_API_BASE_URL = 'http://127.0.0.1:8000/api';

export const predictGenre = async (age: number, gender: string) => {
  try {
    const response = await axios.post(`${BACKEND_API_BASE_URL}/predict/`, {
        gender,
        age,
    });
    // console.log(response.data.predicted_genre);
    return response.data.predicted_genre;

  } catch (error) {
    console.error('Error predicting genre:', error);
    throw error;
  }
};
