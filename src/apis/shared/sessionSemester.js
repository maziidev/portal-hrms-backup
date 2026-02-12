import { api } from "../index.js";



export const getSemesters = (sessionId = null) => {
    const params = sessionId ? { session_id: sessionId } : {};
    return api.get('/hrms/semester_list_create/', { params });
};


export const createSemester = (sessionId, name) => {
    return api.post(`/hrms/semester_list_create/?session_id=${sessionId}`, { name });
};


export const getSemesterById = (semesterId) => {
    return api.get(`/hrms/semesters/${semesterId}/`);
};


export const updateSemester = (semesterId, sessionId, name) => {
    return api.put(`/hrms/semesters/${semesterId}/?session_id=${sessionId}`, { name });
};


export const deleteSemester = (semesterId) => {
    return api.delete(`/hrms/semesters/${semesterId}/`);
};


export const setActiveSession = (sessionId) => {
    return api.post(`/hrms/set_active_session/${sessionId}/`);
};


export const setActiveSemester = (semesterId) => {
    return api.post(`/hrms/set_active_semester/${semesterId}/`);
};


export const getActiveSessionSemester = () => {
    return api.get('/hrms/get_active_session_semester/');
};