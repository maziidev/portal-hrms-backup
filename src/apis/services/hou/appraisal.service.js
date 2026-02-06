import api from '../../http/axios.js';

export const getAppraisalStats = async () => {
    const { data } = await api.get('/appraisals/stats/');
    return data;
};