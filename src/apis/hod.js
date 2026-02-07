import { BaseUrl, api } from ".";

export const getAllStaff = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/staffs`);
  } catch (error) {
    throw error;
  }
};
export const getLeaveAppraisalSummary = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/hod/leave_appraisal_summary_stats/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// GET STAFF SUMMARY
export const getStaffSummary = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/hod/staff_summary_stats/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// HOD LEAVE

export const getStatsOfApprovedAndPendingLeaves = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/hod/leave_stats/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// APPROVE LEAVE REQUESTS OF STAFF 
export const approveStaffLeaveRequest = async (formData) => {
  try {
    const { data } = await api.postForm(
      `${BaseUrl}/hrms/leaves/approve/`, formData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// LEAVES AWAITING MY APPROVAL  
export const getLeavesAwaitingMyApproval = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/list-leaves-for-approval/`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

