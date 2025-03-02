import axios from "axios"
import { API_BASE_URL } from "./ApiConstants"

export default class AccountService {


    static async getAllAccounts(token) {
        try {
            const response = await axios.get(`${API_BASE_URL}/account/all`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data
        } catch (err) {
            throw err;
        }
    }

    static async getAllById(id, token) {
        try {
            const response = await axios.get(`${API_BASE_URL}/account/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data
        } catch (err) {
            throw err;
        }
    }

    static async update(request, token) {
        try {
            const response = await axios.post(`${API_BASE_URL}/account/update`, request,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data
        } catch (err) {
            throw err;
        }
    }
}