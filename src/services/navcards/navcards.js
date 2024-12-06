import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_PROD_API_URL,
});

export const fetchLetters = async () => {
  const response = await api.get('/api/card');
  return response.data;
};

export const updateLetterStatus = async ({ id, isRead }) => {
  const response = await api.patch(`/api/card/${id}`, { isRead });
  return response.data;
};


//MOCK

// const api = axios.create({
//   baseURL: import.meta.env.VITE_MOCK_API_URL,
// });

// export const fetchLetters = async () => {
//   const response = await api.get('/navcards');
//   return response.data;
// };

// export const updateLetterStatus = async ({ id, read }) => {
//   const response = await api.patch(`/navcards/${id}`, { read });
//   return response.data;
// };

