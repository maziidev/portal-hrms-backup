import { BaseUrl, api } from ".";

export const getAllStaff = async () => {
    try {
        const { data } = await api.get(`${BaseUrl}/staffs`)
    } catch (error) {
        throw error;
    }
}