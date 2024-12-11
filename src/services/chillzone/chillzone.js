import axios from 'axios';

const JAMENDO_API_BASE_URL = import.meta.env.VITE_JAMENDO_API_BASE_URL;
const JAMENDO_CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;
const API_URL = import.meta.env.VITE_PROD_API_URL;

const jamendoApi = axios.create({
  baseURL: JAMENDO_API_BASE_URL,
});

export const fetchChristmasSongs = async () => {
  try {
    const response = await jamendoApi.get('/tracks', {
      params: {
        client_id: JAMENDO_CLIENT_ID,
        format: 'json',
        limit: 20,
        tags: 'christmas',
        include: 'musicinfo',
        datebetween: '2024-01-01_2024-12-31', 
      },
    });

    return response.data.results.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      albumArt: track.album_image,
      previewUrl: track.audio,
      duration: track.duration * 1000, 
    }));
  } catch (error) {
    console.error('Error fetching Christmas songs:', error);
    throw error;
  }
};

export const fetchSongDetails = async (songId) => {
  try {
    const response = await jamendoApi.get(`/tracks`, {
      params: {
        client_id: JAMENDO_CLIENT_ID,
        format: 'json',
        id: songId,
        include: 'musicinfo',
      },
    });

    const track = response.data.results[0];
    return {
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      albumArt: track.album_image,
      previewUrl: track.audio,
      duration: track.duration * 1000,
    };
  } catch (error) {
    console.error('Error fetching song details:', error);
    throw error;
  }
};

export const fetchAllMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}api/member`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all members:', error);
    throw error;
  }
};

export const fetchMemberById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}api/member/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching member with ID ${id}:`, error);
    throw error;
  }
};

export const createMember = async (member) => {
  try {
    const response = await axios.post(`${API_URL}api/member`, member);
    return response.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};
