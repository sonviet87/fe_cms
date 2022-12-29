import axiosClient from "./axiosClient";
const url = '/debt-supplier';
const debtSupplierApi = {

  getAll: (params) => {
    return axiosClient.get(url, { params });
  },
  getList: (params) => {
    return axiosClient.get(url + '/getList', { params });
  },
  getListSupplierByFP: (fp_id) => {

    return axiosClient.get(url + '/supplier-list-by-fp', { params: { fp_id } });
  },

  getFPBySupplier: (fp_id, supplier_id) => {

    return axiosClient.get(url + '/supplier-fpdetail', { params: { fp_id, supplier_id } });
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

export default debtSupplierApi;