import api from "../http/axios";


export const getActiveSessionSemester = async () => {
    const { data } = await api.get('/get_active_session_semester');
    return data;
};