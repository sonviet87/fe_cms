import axiosClient from "./axiosClient";
const url = '/kpi-technical';
const kpiTechnicalApi = {
    getAll: (params) => {
        return axiosClient.get(url, { params });
    },


};

export default kpiTechnicalApi;