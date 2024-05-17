import axios from 'axios';

export const fetchTechnologies = async () => {
  const response = await axios.get('/api/technologies');
  return response.data;
};

export const addTechnology = async (data) => {
  const response = await axios.post('/api/technologies', data);
  return response.data;
};

export const updateTechnology = async (id, data) => {
  const response = await axios.put(`/api/technologies/${id}`, data);
  return response.data;
};

export const deleteTechnology = async (id) => {
  await axios.delete(`/api/technologies/${id}`);
  return id;
};