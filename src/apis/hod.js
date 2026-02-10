import { BaseUrl, api } from ".";

export const getAllStaff = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/staffs`);
  } catch (error) {
    throw error;
  }
};

// GET FULL STAFF DETAILS 
export const getFullStaffDetails = async (id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/full_staff/${id}/details/`);
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
      `${BaseUrl}hrms/hod/staff_summary_stats/`,  
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
      `${BaseUrl}hrms/hod/leave_stats/`,
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
      `${BaseUrl}hrms/leaves/approve/`, formData
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
      `${BaseUrl}hrms/list-leaves-for-approval/`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// HOD APPRAISAL

// GET CONDUCT SESSION

export const getHodAppraisalConductSection = async (hod_id) => {
  try {
    const { data } = await api.get( 
      `${BaseUrl}hrms/hod-appraisal/${hod_id}/conduct/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
}
// UPDATE CONDUCT SESSION

export const updateHodAppraisalConductSection = async (hod_id, formData) => {
  try {
    const { data } = await api.putForm( 
      `${BaseUrl}hrms/hod-appraisal/${hod_id}/conduct/`, formData
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// GET GOAL SESSION

export const getHodAppraisalGoalSection = async (hod_id) => {
  try {
    const { data } = await api.get( 
      `${BaseUrl}hrms/hod-appraisal/${hod_id}/goals/`
    );
    return data;
  } catch (error) {
    throw error;
  }
}
// UPDATE GOAL SESSION

export const updateHodAppraisalGoalSection = async (hod_id, formData) => {
  try {
    const { data } = await api.putForm( 
      `${BaseUrl}hrms/hod-appraisal/${hod_id}/goals/`, formData
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// GET PERFORMANCE SESSION

export const getHodAppraisalPerformanceSection = async (hod_id) => {
  try {
    const { data } = await api.get( 
      `${BaseUrl}hrms/hod-appraisal/${hod_id}/performance/`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// UPDATE PERFORMANCE SESSION

export const updateHodAppraisalPerformanceSection = async (hod_id, formData) => {
  try {
    const { data } = await api.putForm( 
      `${BaseUrl}hrms/hod-appraisal/${hod_id}/performance/`, formData
    );
    return data;
  } catch (error) {
    throw error;
  }
}
// GET HOD SUMMARY AND FINAL SUBMIT SESSION

export const getHodSummaryAndFinalSubmit = async (hod_id) => {
  try {
    const { data } = await api.get( 
      `${BaseUrl}hrms/hod-appraisal/${hod_id}/summary-submit/`
    );
    return data;
  } catch (error) {
    throw error;
  }
}
// UPDATE HOD SUMMARY AND FINAL SUBMIT SESSION

export const updateHodSummaryAndFinalSubmit = async (hod_id, formData) => {
  try {
    const { data } = await api.putForm( 
      `${BaseUrl}hrms/hod-appraisal/${hod_id}/summary-submit/`, formData
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// INITIALIZE APPRAISAL 

// GET HOD INITIALIZE APPRAISAL 
export const getHodInitAppraisal = async (appraisal_id) => {
  try {
    const { data } = await api.get( 
      `${BaseUrl}hrms/hod-appraisal/init/${appraisal_id}/`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// CREATE HOD INITIALIZE APPRAISAL 
export const updateHodInitAppraisal = async (appraisal_id, formData) => {
  try {
    const { data } = await api.postForm( 
      `${BaseUrl}hrms/hod-appraisal/init/${appraisal_id}/`, formData
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// GET ALL COMPLETED APPRAISAL ACTED ON BY HOD 
export const getHodCompletedAppraisalStats = async () => {
  try {
    const { data } = await api.get( 
      `${BaseUrl}hrms/hod/completed-appraisal-stats/`
    );
    return data;
  } catch (error) {
    throw error;
  }

}

// GET ALL COMPLETED APPRAISAL ACTED ON BY HOD 
export const getHodPastAppraisalStats = async () => {
  try {
    const { data } = await api.get( 
      `${BaseUrl}hrms/hod/past-appraisals-stats/`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

