import { api } from "./index.js";



export const getAppraisalStats = () => {
    return api.get('/hrms/appraisals/stats/');
};


export const getLeaveAppraisalSummaryStats = () => {
    return api.get('/hrms/leave_appraisal_summary_stats/');
};


export const getStaffSummaryStats = () => {
    return api.get('/hrms/staff_summary_stats/');
};


export const getDetailedStaffInfo = (staffId) => {
    return api.get(`/hrms/detailed_staff_info/${staffId}/`);
};


export const getCompletedAppraisals = (params = {}) => {
    return api.get('/hrms/completed_appraisals/stats/', { params });
};


export const getPastAppraisalPeriods = () => {
    return api.get('/hrms/past_appraisal_periods/');
};


export const getActiveAppraisalPeriod = () => {
    return api.get('/hrms/active_appraisal_period/');
};