import api from '../../http/axios.js';

export const getStaffSummary = async () => {
    const { data } = await api.get('/staff_summary_stats/');
    return data;
};