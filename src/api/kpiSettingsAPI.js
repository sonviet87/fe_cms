import axiosClient from "./axiosClient";
const url = '/kpi-settings-1';
const kpiSettingsApi = {
  getList: () => {
    return axiosClient.get(url);
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

export default kpiSettingsApi;