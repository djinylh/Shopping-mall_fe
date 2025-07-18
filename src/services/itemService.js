import axios from 'axios';
axios.defaults.baseURL = '/api/v1';

export const addproduct = (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.post('/item', formData, config).catch((e) => e.response);
};

export const getItems = () => {
  return axios.get('/item').catch((e) => e.response);
};
