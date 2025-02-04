import axiosClient from "./axiosClient";
const url = '/kpi-supplier';
const kpiSupplierAPI = {
    getAll: (params) => {
        return axiosClient.get(url, { params });
    },


};

export default kpiSupplierAPI;