import { BaseUrl, api } from ".";

export const actionOnAppraisal = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}hrms/appraisal/action`);
    return data;
  } catch (error) {
    throw error;
  }
};

// EXAMINER DASHBOARD STATISTICS
export const getExaminerDashboardStats = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}hrms/examiner/stats/`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getStaffAppraisalFullDetail = async (appraisal_id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/staff-appraisal-full-detail/${appraisal_id}/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
