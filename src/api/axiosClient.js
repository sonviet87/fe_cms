import axios from 'axios';
import { getLSItem } from 'utils';
//import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
/*let header = new Headers({
  "Content-Type": "application/json"
});*/
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //paramsSerializer: params => queryString.stringify(params),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});
//let user = JSON.parse(localStorage.getItem('id_token'));
//if (user) {
//axiosClient.defaults.headers.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
//axiosClient.defaults.headers.common['Authorization'] = `Bearer ${getLSItem('access_token')}`;
//}

//Add a request interceptor
axiosClient.interceptors.request.use(
  function (customConfig) {
    // Do something before request is sent
    const accessToken = getLSItem('access_token');
    if (accessToken) {
      customConfig.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return customConfig;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


// Add a response interceptor
/*axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});*/

export default axiosClient;