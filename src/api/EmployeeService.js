import axios from "axios"
import { API_BASE_URL } from "./ApiConstants"

export default class EmployeeService {

    static async getAllEmployees() {
        try {
            const response = await axios.get(`${API_BASE_URL}/employee/all`)
            return response.data
        } catch (err) {
            throw err;
        }
    }

    static async addEmployee(formData, token) {
        try {
            const response = await axios.post(`${API_BASE_URL}/employee/add`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
            return response.data
        } catch (err) {
            throw err;
        }
    }

    static async removeEmployeeById(id, token) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/employee/remove/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data
        } catch (err) {
            throw err;
        }
    }

    static async updateEmployee(formData, token) {
        try {
            const response = await axios.put(`${API_BASE_URL}/employee/update`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
            return response.data
        } catch (err) {
            throw err;
        }
    }
}