import { api } from "../index.js";



export const getDeanDepartmentOverview = (facultyId) => {
    return api.get(`/hrms/dean_department_overview/${facultyId}/`);
};


export const getDeanFacultyStats = (facultyId) => {
    return api.get(`/hrms/dean_faculty_stats/${facultyId}/`);
};


export const getDepartmentInfo = (departmentId) => {
    return api.get(`/hrms/get_department_info/${departmentId}/`);
};


export const getDepartmentStaff = (departmentId, params = {}) => {
    return api.get(`/hrms/get_department_staff/${departmentId}/`, { params });
};


export const getDepartmentAppraisals = (departmentId, params = {}) => {
    return api.get(`/hrms/get_department_appraisals/${departmentId}/`, { params });
};


export const getDepartmentPromotions = (departmentId) => {
    return api.get(`/hrms/get_department_promotions/${departmentId}/`);
};


export const getDepartmentLeaves = (departmentId) => {
    return api.get(`/hrms/get_department_leaves/${departmentId}/`);
};


export const getStaffStatsPerDepartment = (departmentId) => {
    return api.get(`/hrms/get_staff_stats_per_department/${departmentId}/`);
};