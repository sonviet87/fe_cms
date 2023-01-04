import axiosClient from "./axiosClient";
const url = '/reports-debt-supplier';
const reportDebtSupplierApi = {
  getList: (params) => {
    return axiosClient.get(url, { params });
  },


};

export default reportDebtSupplierApi;