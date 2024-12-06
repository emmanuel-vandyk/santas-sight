import axios from 'axios';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_ACCOUNTS_URL = 'https://accounts.spotify.com/api/token';
const API_URL = import.meta.env.VITE_PROD_API_URL;

let accessToken = '';
let tokenExpirationTime = 0;

const spotifyApi = axios.create({
  baseURL: SPOTIFY_API_BASE_URL,
});

const getAccessToken = async () => {
  const currentTime = Date.now();
  if (accessToken && tokenExpirationTime > currentTime) {
    return accessToken;
  }

  const client_id = import.meta.env.VITE_CLIENT_ID;
  const client_secret = import.meta.env.VITE_CLIENT_SECRET;

  try {
    const response = await axios.post(
      SPOTIFY_ACCOUNTS_URL,
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpirationTime = currentTime + response.data.expires_in * 1000;
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

const executeApiCall = async (method, endpoint, params = {}) => {
  try {
    const token = await getAccessToken();
    const response = await spotifyApi({
      method,
      url: endpoint,
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error executing API call to ${endpoint}:`, error);
    throw error;
  }
};

export const fetchChristmasSongs = async () => {
  try {
    const data = await executeApiCall('get', '/search', {
      q: 'christmas',
      type: 'track',
      limit: 20,
    });
    return data.tracks.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      albumArt: track.album.images[0].url,
      previewUrl: track.preview_url,
    }));
  } catch (error) {
    console.error('Error fetching Christmas songs:', error);
    throw error;
  }
};

export const fetchSongDetails = async (songId) => {
  try {
    const data = await executeApiCall('get', `/tracks/${songId}`);
    return {
      id: data.id,
      title: data.name,
      artist: data.artists[0].name,
      albumArt: data.album.images[0].url,
      previewUrl: data.preview_url,
      duration: data.duration_ms,
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
