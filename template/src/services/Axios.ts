import axios from 'axios';
import {Constants} from 'utils';

const Axios = axios.create({
  baseURL: Constants.BASE_URL,
});

Axios.interceptors.request.use(request => {
  console.log('request', JSON.stringify(request, null, 2));
  return request;
});

Axios.interceptors.response.use(
  response => {
    console.log('response', JSON.stringify(response, null, 2));
    return response.data;
  },
  error => {
    console.log('error Axios', JSON.stringify(error, null, 2));
    console.log('error Api', JSON.stringify(error.response?.data, null, 2));
    return Promise.reject(error);
  },
);
