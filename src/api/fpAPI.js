import axiosClient from "./axiosClient";
const url = '/fps';
const fpApi = {
  getAll: (params) => {
    return axiosClient.get(url, { params });
  },
  getList: (params) => {
    return axiosClient.get(url + '/getList', { params });
  },
  get: (id) => {
    return axiosClient.get(url + '/' + id);
  },

  add: (params) => {
    return axiosClient.post(url, params);
  },
  update: (id, params) => {
    return axiosClient.put(url + '/' + id, params);
  },
  updateStatus: (values) => {

    return axiosClient.post(url + '/updateStatus', values);
  },
  delete: (ids) => {

    return axiosClient.delete(url, {

      data: {
        ids
      }
    });
  }
};

export default fpApi;