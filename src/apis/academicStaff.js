import { BaseUrl, api } from ".";


export const createAppraisal = async (data) => {
    try {
        const { response } = await api.postForm(`${BaseUrl}/hrms/appraisals`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

// SAVE ADMINSTRATIVE AND COMMUNITY SERVICE
export const saveAdminstrativeAndCommunityService = async (data, id) => {
    try {
        const { response } = await api.putForm(`${BaseUrl}/hrms/appraisals/${id}/admin`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

// SAVE PROFESSIONAL DEVELOPMENT
export const saveProfessonalDevelopment = async (data, id) => {
    try {
        const { response } = await api.putForm(`${BaseUrl}/hrms/appraisals/${id}/professional`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

// SUBMIT APPRAISAL
export const submitAppraisal = async (data, id) => {
    try {
        const { response } = await api.putForm(`${BaseUrl}/hrms/appraisals/${id}/submit`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

// RETRIEVE SAVE APPRAISAL SUMMARY 
export const retrieveSaveAppraisalSummary = async (id) => {
    try {
        const { response } = await api.get(`${BaseUrl}/hrms/appraisals/${id}/summary`);
        return response;
    } catch (error) {
        throw error;
    }
}
// RETRIEVE SAVE UPDATE SUMMARY 
export const updateSaveAppraisalSummary = async (data, id) => {
    try {
        const { response } = await api.putForm(`${BaseUrl}/hrms/appraisals/${id}/summary`, data);
        return response;
    } catch (error) {
        throw error;
    }
}
// UPDATE SAVE TEACHING AND RESEARCH PERFORMANCE SUMMARY 
export const updateTeachingAndResearchPerformance = async (data, id) => {
    try {
        const { response } = await api.putForm(`${BaseUrl}/hrms/appraisals/${id}/teaching-research`, data);
        return response;
    } catch (error) {
        throw error;
    }
}
// UPLOAD CERTIFICATION 
export const uploadCertification = async (data) => {
    try {
        const { response } = await api.putForm(`${BaseUrl}/hrms/certifications/upload/`, data);
        return response;
    } catch (error) {
        throw error;
    }
}
// UPLOAD SUPPORTING DOCUMENT 
export const uploadSupportingDocument = async (data) => {
    try {
        const { response } = await api.postForm(`${BaseUrl}/hrms/documents/upload/`, data);
        return response;
    } catch (error) {
        throw error;
    }
}