import axios from 'axios';

//BACKEND

// const api = axios.create({
//   baseURL: '/api',
// });

// export const fetchLetters = async () => {
//   const response = await api.get('/letters');
//   return response.data;
// };

// export const updateLetterStatus = async ({ id, read }) => {
//   const response = await api.patch(`/letters/${id}`, { read });
//   return response.data;
// };

//MOCK

const api = axios.create({
  baseURL: import.meta.env.VITE_MOCK_API_URL,
});

export const fetchLetters = async () => {
  const response = await api.get('/navcards');
  return response.data;
};

export const updateLetterStatus = async ({ id, read }) => {
  const response = await api.patch(`/navcards/${id}`, { read });
  return response.data;
};

