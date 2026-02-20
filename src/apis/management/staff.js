import { api } from "../index.js";

/**
 * Get all staff with optional filters for department, employment type, or search query
 * @param {Object} params - { dept_code, employment_type, search }
 */
export const getAllStaff = (params = {}) => {
    return api.get('/hrms/list_staff/', { params });
};

/**
 * Add a new staff member using Form Data
 * @param {FormData} staffData
 */
export const addStaff = (staffData) => {
    return api.postForm('/hrms/add_staff/', staffData);
};

/**
 * Get detailed information for a specific staff member by their ID
 * @param {number|string} staff_id
 */
export const getStaffById = (staff_id) => {
    return api.get(`/hrms/get_staff_by_id/${staff_id}/`);
};

/**
 * Get the current logged-in user's staff information
 */
export const getMyStaffInfo = () => {
    return api.get('/hrms/get_my_staff_info/');
};