import { BaseUrl, api } from ".";

// APPRAISAL DASHBOARD OVERVIEW
export const getDapAppraisalDashboardOverview = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/appraisals/dashboard/overview/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// FACULTY APPRAISAL OVERVIEW
export const getFacultyOverviewDapAppraisal = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/appraisals/faculty-overview/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const getDapPerformanceTrendByFaculty = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/appraisals/performance-trend/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const getDapAppraisalCompletionRateByByFaculty = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/dashboard/appraisal-completion/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const getListsOfAppraisalForDepartment = async (id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/dashboard/appraisals/${id}/department-list/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const getDapAppraisalofFaculty = async (faculty_id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/dashboard/appraisals/faculty-stats/${faculty_id}/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const getDepartmentAppraisalRecordsByFaculty = async (faculty_id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/dashboard/appraisals/faculty/${faculty_id}/departments/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const getDepartmentLevelStaffAndActivityStatistics = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/dashboard/departments/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// DAP DASHBOARD OVERVIEW METRICS
export const getDapDashboardOverviewMetrics = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/dashboard/overview/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// LIST PROMOTIONS FOR DAP REVIEW
export const getPromotionsForDapReview = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/dashboard/promotions/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// PROMOTION STATS OF THE FACULTY ID GIVEN IN THE URL.
export const getPromotionStatsOfFacultyId = async (faculty_id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/dashboard/promotions/faculty-stats/${faculty_id}/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// PUBLICATION VERIFICATION STATUS STATISTICS
export const getPublicationVerficationStatusStatistics = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/dashboard/publication-status/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// LEAVE DASHBOARD OVERVIEW 
export const getLeaveDashboardOverview = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/leaves/dashboard/overview/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};


// FACULTY LEAVE  OVERVIEW 
export const getfacultyLeaveOverview = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/leaves/faculty-overview/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// LEAVE DISTRIBUTION BY FACULTY 
export const getLeaveDistributionByFaculty = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/leaves/faculty-share/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};


// LIST AND FILTER LEAVE APPLICATIONS
export const listAndFilterLeaveApplications = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/leaves/list/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};


// LEAVE TYPE DISTRIBUTION
export const getLeaveTypeDistribution = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/leaves/type-distribution/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// PROMOTION DETAILS WITH ANALYTICS 
export const getPromotionDetailsWithAnalytics = async (id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/promotions/${id}/details/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// PROMOTION APPROVAL RATE BY FACULTY
export const getPromotionApprovalRateByFaculty = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/promotions/approval-rate/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// PROMOTION DASHBOARD OVERVIEW
export const getPromotionDashboardOverview = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/promotions/dashboard/overview/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// PROMOTION APPROVAL RATE BY DEPARTMENT
export const getPromotionApprovalRateByDepartment = async (faculty_id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/promotions/faculty/${faculty_id}/department-rate/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};


// FACULTY PROMOTION OVERVIEW
export const getFacultyPromotionOverview = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/promotions/records/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// PROMOTION TRENDS BY FACULTY
export const getPromotionTrendsByFaculty = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}hrms/dap/promotions/trends/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
