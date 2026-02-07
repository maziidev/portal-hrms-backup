import api from '../../http/axios.js';

export const getPromotionStats = async () => {
    const { data } = await api.get('/promotion_stats/');
    return data;
};