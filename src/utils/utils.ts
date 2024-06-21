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
            const response: AxiosResponse<T> = await axios.get(`${this.baseUrl}${endpoint}`,{
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
        try {
            const response: AxiosResponse<T> = await axios.post(`${this.baseUrl}${endpoint}`, data)
            return response.data
        }
        catch (error) {
            throw error;
        }
    }

    public async delete(endpoint: string, id: string) {
        try {
            await axios.delete(`${this.baseUrl}${endpoint}/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    public async update(endpoint: string, id: string, data: any) {
        try {
            await axios.patch(`${this.baseUrl}${endpoint}/${id}`, data)
        }
        catch (e) {
            console.log(e)
        }
    }
}

