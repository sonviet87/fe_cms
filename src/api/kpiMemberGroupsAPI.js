import axiosClient from "./axiosClient";
const url = '/kpi-member-groups';
const kpiMemberGroupsApi = {
  getList: (params) => {
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    return axiosClient.get(url + '/' + id);
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

export default kpiMemberGroupsApi;