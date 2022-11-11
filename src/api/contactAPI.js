import axiosClient from "./axiosClient";
const url = '/contacts';
const contactApi = {
  getAll: (params) => {
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    return axiosClient.get(url + '/' + id);
  },

  getByIDUsers: (id) => {
    return axiosClient.get(url + '/user/' + id );
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

export default contactApi;