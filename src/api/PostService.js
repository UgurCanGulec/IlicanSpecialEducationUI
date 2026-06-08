import axios from "axios"
import { API_BASE_URL } from "./ApiConstants"

export default class PostService {

    static async getAllPosts() {
        try {
            const response = await axios.get(`${API_BASE_URL}/post/all`, { timeout: 10000 })
            return response.data
        } catch (err) {
            throw err;
        }
    }

    static async addPost(formData, token) {
        try {
            const response = await axios.post(`${API_BASE_URL}/post/add`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
            return response.data
        } catch (err) {
            throw err;
        }
    }

    static async removePostById(id, token) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/post/delete/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data
        } catch (err) {
            throw err;
        }
    }

    static async updatePost(formData, token) {
        try {
            const response = await axios.put(`${API_BASE_URL}/post/update`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
            return response.data
        } catch (err) {
            throw err;
        }
    }
}