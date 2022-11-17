import axiosClient from "./axiosClient";
const url = '/suppliers';
const supplierApi = {
  getAll: (params) => {
    return axiosClient.get(url, { params });
  },
  getlist: (params) => {
    return axiosClient.get('/suppliersList', { params });
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
  }
};

export default supplierApi;