import axiosClient from "./axiosClient";
const url = '/reports-debt-fp';
const reportDebtFPApi = {
  getList: (params) => {
    return axiosClient.get(url, { params });
  },


};

export default reportDebtFPApi;