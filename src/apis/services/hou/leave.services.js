import api from '../../http/axios.js';

/**
 * =========================
 * LEAVE APIs
 * =========================
 */
export const getLeaveStats = async () => {
    const { data } = await api.get('/leave_stats/');
    return data;
};

export const getLeaveTypeStats = async () => {
    const { data } = await api.get('/leave_type_stats/');
    return data;
};

export const getLeaveDetail = async (leaveId) => {
    const { data } = await api.get(`/leave_detail/${leaveId}/`);
    return data;
};

export const getAllLeaves = async () => {
    const { data } = await api.get('/list_leaves/');
    return data;
};

/**
 * =========================
 * NOTIFICATION APIs
 * =========================
 */
export const getNotifications = async () => {
    const { data } = await api.get('/notifications/');
    return data.results || [];
};
