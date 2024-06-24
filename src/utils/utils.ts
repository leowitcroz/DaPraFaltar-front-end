import type { AxiosResponse } from "axios";
import axios from "axios";

export class ApiRequests {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get<T>(endpoint: string): Promise<T> {

        const token = localStorage.getItem('authToken')

        try {
            const response: AxiosResponse<T> = await axios.get(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }

    public async post<T>(endpoint: string, data: any): Promise<T> {

        const token = localStorage.getItem('authToken')
        console.log(data)

        try {
            const response: AxiosResponse<T> = await axios.post(`${this.baseUrl}${endpoint}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        }
        catch (error) {
            throw error;
        }
    }

    public async delete(endpoint: string, id: string) {

        const token = localStorage.getItem('authToken')
        try {
            await axios.delete(`${this.baseUrl}${endpoint}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    public async update(endpoint: string, id: string, data: any) {
        try {

            const token = localStorage.getItem('authToken')
            await axios.patch(`${this.baseUrl}${endpoint}/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}

