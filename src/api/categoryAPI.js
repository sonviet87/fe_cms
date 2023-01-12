import axiosClient from "./axiosClient";
const url = '/categories';
const categoryAPi = {
  getAll: (params) => {
    return axiosClient.get(url, { params });
  },

  getList: (params) => {
    return axiosClient.get(url + '/getList', { params });
  },
  get: (id) => {
    return axiosClient.get(url + '/' + id);
  },
  import: (params) => {
    return axiosClient.post(url + '/import', params);
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

export default categoryAPi;