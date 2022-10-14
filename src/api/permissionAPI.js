import axiosClient from "./axiosClient";
const url = '/permissions';
const permissionsApi = {
  getAll: () => {
    return axiosClient.get(url);
  },

};

export default permissionsApi;