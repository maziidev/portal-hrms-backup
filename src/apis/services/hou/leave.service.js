import api from '../../http/axios.js';

export const getLeaveStats = async () => {
    const { data } = await api.get('/leave_stats/');
    return data;
};
