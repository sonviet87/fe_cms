import axiosClient from "./axiosClient";
const url = '/chances';
const chanceApi = {
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
  delete: (ids) => {

    return axiosClient.delete(url, {

      data: {
        ids
      }
    });
  },
  updateStatus: (values) => {

    return axiosClient.post(url + '/updateStatus', values);
  },
  updateProgress: (values) => {

    return axiosClient.post(url + '/updateProgress', values);
  },
};

export default chanceApi;