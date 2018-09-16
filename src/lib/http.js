import axios from 'axios';
import {baseUrl} from '../config/constants';

const instance = axios.create({
  baseURL: baseUrl,
  headers: {

  }
});

export const setHttpAuthToken = token => {
  instance.defaults.headers.Authorization = token;
};


export default instance