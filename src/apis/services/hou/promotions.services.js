import api from '../../http/axios.js';
/**
 * =========================
 * PROMOTION APIs
 * =========================
 */

export const getPromotions = async () => {
    const { data } = await api.get('/list_promotions');
    return data;
};
export const getPromotionStats = async () => {
    const { data } = await api.get('/promotion_stats/');
    return data.promotion_stats || {};
};

export const getPromotionDetails = async (promotionId) => {
    const { data } = await api.get(`/promotion_detail/${promotionId}/`);
    return data;
};
