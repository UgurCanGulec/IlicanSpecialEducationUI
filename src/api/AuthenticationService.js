import axios from "axios"
import { API_BASE_URL } from "./ApiConstants"

export default class AuthenticationService {

    static async login(username, password) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password })
            return response.data
        } catch (err) {
            throw err
        }
    }

    static async register(request) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, request)
                return response.data
        } catch (err) {
            throw err;
        }
    }
    
    static async getProfile(token) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/profile`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                return response.data
        } catch (err) {
            throw err;
        }
    }

    static async refresh(token) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                return response.data
        } catch (err) {
            throw err;
        }
    }

    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('authenticated')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin()
    }

}