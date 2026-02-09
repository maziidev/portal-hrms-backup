import api from '../../http/axios.js';

/**
 * =========================
 * SEMESTERS & SESSIONS APIs
 * =========================
 */
export const listSemesters = async (sessionId = null) => {
    const params = sessionId ? { session_id: sessionId } : {};
    const { data } = await api.get('/semester_list_create/', { params });
    return data || [];
};

export const createSemester = async (sessionId, name) => {
    const { data } = await api.post(`/semester_list_create/?session_id=${sessionId}`, { name });
    return data;
};

export const getSemesterDetails = async (semesterId) => {
    const { data } = await api.get(`/semesters/${semesterId}/`);
    return data;
};

export const updateSemester = async (semesterId, sessionId, name) => {
    const { data } = await api.put(`/semesters/${semesterId}/`, { name }, { params: { session_id: sessionId } });
    return data;
};

export const deleteSemester = async (semesterId) => {
    const { data } = await api.delete(`/semesters/${semesterId}/`);
    return data;
};

export const setActiveSession = async (sessionId) => {
    const { data } = await api.post(`/set_active_session/${sessionId}/`);
    return data;
};

export const setActiveSemester = async (semesterId) => {
    const { data } = await api.post(`/set_active_semester/${semesterId}/`);
    return data;
};

export const getActiveSessionSemester = async () => {
    const { data } = await api.get('/get_active_session_semester/');
    return data || {};
};
