import { BaseUrl, api } from ".";

export const createAppraisal = async (formData) => {
  try {
    const { data } = await api.postForm(`${BaseUrl}/hrms/appraisals`, formData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAcademicAppraisals = async () => {
  try {
    const { data } = await api.postForm(`${BaseUrl}/hrms/academic-appraisals/`);
    return data;
  } catch (error) {
    throw error;
  }
};

// SAVE ADMINSTRATIVE AND COMMUNITY SERVICE
export const saveAdminstrativeAndCommunityService = async (formData, id) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/appraisals/${id}/admin`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// SAVE PROFESSIONAL DEVELOPMENT
export const saveProfessonalDevelopment = async (formData, id) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/appraisals/${id}/professional`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// SUBMIT APPRAISAL
export const submitAppraisal = async (formData, id) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/appraisals/${id}/submit`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// RETRIEVE SAVE APPRAISAL SUMMARY
export const retrieveSaveAppraisalSummary = async (id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/appraisals/${id}/summary`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// RETRIEVE SAVE UPDATE SUMMARY
export const updateSaveAppraisalSummary = async (formData, id) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/appraisals/${id}/summary`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// UPDATE SAVE TEACHING AND RESEARCH PERFORMANCE SUMMARY
export const updateTeachingAndResearchPerformance = async (formData, id) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/appraisals/${id}/teaching-research`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// UPLOAD CERTIFICATION
export const uploadCertification = async (formData) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/certifications/upload/`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// UPLOAD SUPPORTING DOCUMENT
export const uploadSupportingDocument = async (formData) => {
  try {
    const { data } = await api.postForm(
      `${BaseUrl}/hrms/documents/upload/`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// GET ACADEMIC QULIFICATIONS LIST
export const getAcademicQualificationsList = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/academic-qualifications/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// CREATE ACADEMIC QULIFICATIONS

export const createAcademicQualifications = async (formData) => {
  try {
    const { data } = await api.postForm(
      `${BaseUrl}/hrms/academic-qualifications/`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// RETRIEVE ACADEMIC QULIFICATIONS
export const retrieveAcademicQualifications = async (id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/academic-qualifications/${id}/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// UPDATE ACADEMIC QULIFICATIONS
export const updateAcademicQualifications = async (id, formData) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/academic-qualifications/${id}/`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// DELETE ACADEMIC QULIFICATIONS
export const deleteAcademicQualifications = async (id) => {
  try {
    const { data } = await api.delete(
      `${BaseUrl}/hrms/academic-qualifications/${id}/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// RETRIEVE EMERGENCY CONTACTS
export const retrieveEmergencyContacts = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/emergency-contacts/`);
    return data;
  } catch (error) {
    throw error;
  }
};

// RETRIEVE EMERGENCY CONTACT
export const retrieveEmergencyContact = async (id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/emergency-contacts/${id}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// CREATE EMERGENCY CONTACTS
export const createEmergencyContacts = async (formData) => {
  try {
    const { data } = await api.postForm(
      `${BaseUrl}/hrms/emergency-contacts/`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// UPDATE EMERGENCY CONTACTS
export const updateEmergencyContacts = async (id, formData) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/emergency-contacts/${id}`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// UPDATE EMERGENCY CONTACTS
export const deleteEmergencyContacts = async (id) => {
  try {
    const { data } = await api.delete(
      `${BaseUrl}/hrms/emergency-contacts/${id}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// CREATE AI KEYWORDS
export const createAiKeywords = async (formData) => {
  try {
    const { data } = await api.postForm(
      `${BaseUrl}/hrms/keywords-ai/`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// STAFF PUBLICATION PERFORMANCE DASHBOARD
export const getStaffPublicationPerformance = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/performance/publications/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// EXPORT STAFF PUBLICATION PERFORMANCE CSV FILE
export const exportPublicationPerformanceCSVFile = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/performance/publications/export/csv/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// EXPORT STAFF PUBLICATION PERFORMANCE PDF FILE
export const exportPublicationPerformancePDFFile = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/performance/publications/export/pdf/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// PERSONAL INFO LIST

// GET ALL STAFF PERSONAL INFORMATION
export const getAllStaffPersonalInformation = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/personal-info/`);
    return data;
  } catch (error) {
    throw error;
  }
};
// CREATE STAFF PERSONAL INFORMATION LIST
export const createStaffPersonalInformation = async (formData) => {
  try {
    const { data } = await api.postForm(
      `${BaseUrl}/hrms/personal-info/`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// GET STAFF PERSONAL INFORMATION LIST
export const getStaffPersonalInformation = async (id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/personal-info/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// UPDATE STAFF PERSONAL INFORMATION LIST
export const updateStaffPersonalInformation = async (id, formData) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/personal-info/${id}`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// DELETE STAFF PERSONAL INFORMATION LIST
export const deleteStaffPersonalInformation = async (id) => {
  try {
    const { data } = await api.delete(
      `${BaseUrl}/hrms/personal-info/${id}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// RETRIEVE PROFESSIONAL MEMBERSHIPS
export const getProfessionalMemberships = async () => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/professional-memberships/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// CREATE PROFESSIONAL MEMBERSHIPS
export const createProfessionalMemberships = async (formData) => {
  try {
    const { data } = await api.postForm(
      `${BaseUrl}/hrms/professional-memberships/`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// GET PROFESSIONAL MEMBERSHIP
export const getProfessionalMembership = async (id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/professional-memberships/${id}`,
    );
    return data;

  } catch (error) {
    throw error;
  }
};
// UPDATE PROFESSIONAL MEMBERSHIPS
export const updateProfessionalMembership = async (id, formData) => {
  try {
    const { data } = await api.putForm(
      `${BaseUrl}/hrms/professional-memberships/${id}`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// DELETE PROFESSIONAL MEMBERSHIPS
export const deleteProfessionalMembership = async (id) => {
  try {
    await api.delete(`${BaseUrl}/hrms/professional-memberships/${id}`);
    return { message: "Professional Membership deleted successfully" };
  } catch (error) {
    throw error;
  }
};

// GET ALL PUBLICATION LIST
export const getPublicationList = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/publications/`);
    return data;
  } catch (error) {
    throw error;
  }
};
// GET PUBLICATION LIST BY ID
export const getPublicationListById = async (id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/publications/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
// CREATE PUBLICATION LIST
export const createPublicationList = async (formData) => {
  try {
    const { data } = await api.postForm(
      `${BaseUrl}/hrms/publications/`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// UPDATE PUBLICATION LIST
export const updatePublicationList = async (id, formData) => {
  try {
    const { data } = await api.postForm(
      `${BaseUrl}/hrms/publications/${id}`,
      formData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// DELETE PUBLICATION LIST
export const deletePublicationList = async (id) => {
  try {
    await api.postForm(`${BaseUrl}/hrms/publications/${id}`);
    return { message: "Publication deleted" };
  } catch (error) {
    throw error;
  }
};

// GET RESOLVED PUBLICATIONS
export const getResolvedPublications = async (id) => {
  try {
    const { data } = await api.get(
      `${BaseUrl}/hrms/publications/${id}/resolved/`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// GET STAFF DOCUMENTS LISTS
export const getStaffDocumentList = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/staff-documents/`);
    return data;
  } catch (error) {
    throw error;
  }
};
// GET STAFF DOCUMENTS BY ID
export const getStaffDocumentById = async (id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/staff-documents/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// CREATE STAFF DOCUMENTS LISTS
export const createStaffDocumentList = async (formData) => {
  try {
    const { data } = await api.postForm(`${BaseUrl}/hrms/staff-documents/`, formData);
    return data;
  } catch (error) {
    throw error;
  }
};
// UPDATE STAFF DOCUMENTS LISTS
export const updateStaffDocument = async (id, formData) => {
  try {
    const { data } = await api.putForm(`${BaseUrl}/hrms/staff-documents/${id}`, formData);
    return data;
  } catch (error) {
    throw error;
  }
};
// CREATE STAFF DOCUMENTS LISTS
export const deleteStaffDocument = async (id) => {
  try {
    await api.delete(`${BaseUrl}/hrms/staff-documents/${id}`);
    return {message:"Staff document deleted"};
  } catch (error) {
    throw error;
  }
};

// STAFF DETAIL 
export const getStaffDetail = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/staff/dashboard/`);
    return data;
  } catch (error) {
    throw error;
  }
};

// STAFF PERFORMANCE HISTORY
export const getStaffPerformanceHistory = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/staff/performance-history/`);
    return data;
  } catch (error) {
    throw error;
  }
};
// EXPORT STAFF PERFORMANCE HISTORY AS CSV
export const exportStaffPerformanceHistoryAsCsv = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/staff/performance/export/csv/`);
    return data;
  } catch (error) {
    throw error;
  }
};
// EXPORT STAFF PERFORMANCE HISTORY AS PDF
export const exportStaffPerformanceHistoryAsPdf = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/staff/performance/export/pdf/`);
    return data;
  } catch (error) {
    throw error;
  }
};

// GET HRMS TEACHING ASSIGNMENTS LIST
export const hrmsTeachingAssignmentsList = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/teaching-assignments/`);
    return data;
  } catch (error) {
    throw error;
  }
};

// CREATE HRMS TEACHING ASSIGNMENTS LIST
export const createHrmsTeachingAssignmentsList = async (formData) => {
  try {
    const { data } = await api.postForm(`${BaseUrl}/hrms/teaching-assignments/`, formData);
    return data;
  } catch (error) {
    throw error;
  }
};


// GET HRMS TEACHING ASSIGNMENTS LIST ID
export const hrmsTeachingAssignmentsListById = async (id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/teaching-assignments/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};


// UPDATE HRMS TEACHING ASSIGNMENTS LIST ID
export const updateTeachingAssignmentsList = async (id, formData) => {
  try {
    const { data } = await api.putForm(`${BaseUrl}/hrms/teaching-assignments/${id}`, formData);
    return data;
  } catch (error) {
    throw error;
  }
};
// DELETE HRMS TEACHING ASSIGNMENTS LIST ID
export const deleteTeachingAssignmentsList = async (id) => {
  try {
    const { data } = await api.delete(`${BaseUrl}/hrms/teaching-assignments/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// ACADEMIC STAFF PROMOTION

// GET PROMOTION DETAIL BY ID
export const getPromotionDetailById = async (id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/promotion-details/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
} 

// DELETE ACADEMIC STAFF PROMOTION
export const deletePromotionDetailById = async (id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/promotion-details/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
} 

// CREATE NEW PROMOTION REQUEST
export const createNewPromotionRequest = async (formData) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/promotions/`, formData);
    return data;
  } catch (error) {
    throw error;
  }
} 
// TRACK A PROMOTION APPLICATION TIMELINE
export const trackPromotionApplicationTimeLine = async (promotion_id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/promotions/${promotion_id}/timeline`);
    return data;
  } catch (error) {
    throw error;
  }
} 

// ACADEMIC STAFF LEAVE

// GET DETAILS OF A SPECIFIC LEAVE REQUEST
export const getSpecificLeaveRequestDetails = async (id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/leave-details/${id}/`);
    return data;
  } catch (error) {
    throw error;
  }
} 


// DELETE DETAILS OF A SPECIFIC LEAVE REQUEST
export const deleteSpecificLeaveRequestDetails = async (id) => {
  try {
    const { data } = await api.delete(`${BaseUrl}/hrms/leave-details/${id}/`);
    return data;
  } catch (error) {
    throw error;
  }
} 


// CREATE A NEW LEAVE REQUEST
export const createNewLeaveRequest = async () => {
  try {
    const { data } = await api.postForm(`${BaseUrl}/hrms/leaves/`);
    return data;
  } catch (error) {
    throw error;
  }
} 

// TRACK A LEAVE APPLICATION TIMELINE
export const trackLeaveApplicationTimeLine = async (leave_id) => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/leaves/${leave_id}/timeline/`);
    return data;
  } catch (error) {
    throw error;
  }
} 


// LEAVE DAYS PER QUARTER
export const getLeaveQuarterlySummary = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/leaves/quarterly-summary/`);
    return data;
  } catch (error) {
    throw error;
  }
} 


// MY LEAVES REQUESTS
export const getLeaveRequests = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/my-leaves/`);
    return data;
  } catch (error) {
    throw error;
  }
} 