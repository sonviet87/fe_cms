import axiosClient from "./axiosClient";
const url = '/reports';
const reportApi = {
  getList: (params) => {
    return axiosClient.get(url, { params });
  },


};

export default reportApi;