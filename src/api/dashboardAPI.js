import axiosClient from "./axiosClient";
const url = '/dashboard';
const dashboardAPI = {
  getAll: (params) => {
    return axiosClient.get(url, { params });
  },

};

export default dashboardAPI;