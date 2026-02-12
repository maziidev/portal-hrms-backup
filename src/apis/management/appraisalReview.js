import { api } from "./index.js";

/**
 * Review an appraisal at its current stage
 * Stage flow: HOD → DEAN → HR → VC
 * @param {number} appraisalId
 * @param {Object} data
 * @param {string} data.decision - APPROVED or REJECTED
 * @param {string} data.comment - Optional review comment
 */
export const reviewAppraisal = (appraisalId, data) => {
    return api.post(`/hrms/review_appraisal/${appraisalId}/`, data);
};

