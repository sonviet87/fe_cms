import axiosClient from "./axiosClient";
const url = '/users';
const userApi = {
  getAll: (params) => {
    return axiosClient.get(url, { params });
  },
  getList: (params) => {
    return axiosClient.get(url + '/getList', { params });
  },
  get: (id) => {
    return axiosClient.get(url + '/' + id);
  },
  login: (params) => {

    return axiosClient.post('/login-by-username', params);
  },
  changePass: (params) => {

    return axiosClient.post(url + '/change-password', params);
  },
  getUser: () => {
    const url = '/user';
    return axiosClient.get(url);
  },
  add: (params) => {
    return axiosClient.post(url, params);
  },
  update: (id, params) => {
    return axiosClient.put(url + '/' + id, params);
  },
  delete: (ids) => {

    return axiosClient.delete(url, {

      data: {
        ids
      }
    });
  }
};

export default userApi;