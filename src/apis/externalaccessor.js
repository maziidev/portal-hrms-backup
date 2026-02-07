import { BaseUrl, api } from ".";

export const getAllStaff = async () => {
    try {
        const { data } = await api.get(`${BaseUrl}/staffs`)
    } catch (error) {
        throw error;
    }
}

const getEvaluationSummary = async () => {
    try {
        const { data } = await api.get(`3001/external`);
    } catch (error) {
        throw error;
    }
}