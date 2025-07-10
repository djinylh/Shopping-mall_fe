import axios from 'axios';
axios.defaults.baseURL = '/api/v1';

const path = '/order';

export const addOrder = args => {
  return axios.post(path,args).catch(e=>e.response);
}
