import axios from 'axios';

const JAMENDO_API_BASE_URL = 'https://api.jamendo.com/v3.0/tracks/';
const CLIENT_ID = '256cc443';

export const fetchMusicByGenre = async (genre: string) => {
  try {
    const response = await axios.get(JAMENDO_API_BASE_URL, {
      params: {
        client_id: CLIENT_ID,
        format: 'json',
        fuzzytags: genre,
        limit: 10,
        order: 'popularity_total',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching music:', error);
    throw error;
  }
};
