import axiosClient from "./axiosClient";
const url = '/kpi';
const kpiApi = {
    getAll: (params) => {
        return axiosClient.get(url, { params });
    },


};

export default kpiApi;