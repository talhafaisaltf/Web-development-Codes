import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const storeComment = (data = {}) => 
    apiService.post(API_URLS.STORE_COMMENT, data);

export const commentService = {
    storeComment,
};