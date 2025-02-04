import axiosClient from "./axiosClient";
const url = '/kpi-setup-user';
const kpiSetUpUserApi = {
  getList: (params) => {
    return axiosClient.get(url, { params });
  },
  getAll: (params) => {
    return axiosClient.get(url+ '/getList', { params });
  },
  get: (id) => {
    return axiosClient.get(url + '/' + id);
  },

  getIDByUser: (params) => {
    return axiosClient.get('kpi-setup-user-get-user-id',{ params });
  },
  checkKpiIDUser: (params) => {
    return axiosClient.get('kpi-setup-user-check-kpi',{ params });
  },

  add: (params) => {
    return axiosClient.post(url, params);
  },
  update: (id, params) => {
    return axiosClient.put(url + '/' + id, params);
  },

  delete: (ids) => {

    return axiosClient.delete(url, {

      data: {
        ids
      }
    });
  }
};

export default kpiSetUpUserApi;