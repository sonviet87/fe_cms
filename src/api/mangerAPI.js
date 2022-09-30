import axiosClient from "./axiosClient";
const url = '/manager';
const managerApi = {
    getAll: (params) => {

        return axiosClient.get(url, { params });
    },
    getExportExel: (params) => {
        return axiosClient.get(url + '/export', { params, responseType: 'blob' })
    }
};

export default managerApi;