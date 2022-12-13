import { getLSItem } from "utils";
import axiosClient from "./axiosClient";
const url = '/uploads';
const uploadApi = {
    upload: (params, onUploadProgress) => {
        return axiosClient.post(url, params, {
            headers: {
                "Authorization": `Bearer ${getLSItem('access_token')}`,
                "Content-type": "application/json",
            },
            onUploadProgress,
        });
    },

};

export default uploadApi;