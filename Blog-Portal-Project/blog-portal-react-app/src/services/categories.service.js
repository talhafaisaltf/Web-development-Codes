import { apiService } from "../utils/api.service"
import { API_URLS } from "./apiUrls"

const getCategory = () => {
    return apiService.get(API_URLS.GET_CATEGORY);
};

const getCategoryById = (catId) => {
    return apiService.get(`${API_URLS.GET_CATEGORY}/${catId}`);
};

const deleteCategory = (catId) => {
    return apiService.delete(`${API_URLS.GET_CATEGORY}/${catId}`);
};

const addCategory = (payload) => {
    return apiService.post(API_URLS.GET_CATEGORY, payload);
};

export const CategoryService = {
    getCategory,
    getCategoryById,
    deleteCategory,
    addCategory,
};