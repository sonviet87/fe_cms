import axiosClient from "./axiosClient";
const url = '/kpi-sale';
const kpiSaleAPI = {
    getAll: (params) => {
        return axiosClient.get(url, { params });
    },
    getListKpiSale: (params) => {
        return axiosClient.get('kpi-list-sale', { params });
    },


};

export default kpiSaleAPI;