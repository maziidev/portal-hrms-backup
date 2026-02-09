import api from "../../http/axios.js";

/**
 * =========================
 * APPRAISAL APIs
 * =========================
 */

export const getAppraisalStats = async () => {
    const { data } = await api.get("/appraisals/stats/");
    return data;
};

export const getLeaveAppraisalSummaryStats = async () => {
    const { data } = await api.get("/leave_appraisal_summary_stats/");
    return data;
};

/**
 * =========================
 * APPRAISAL PERIODS
 * =========================
 */

export const getPastAppraisalPeriods = async () => {
    const { data } = await api.get("/past_appraisal_periods/");
    return data;
};

export const getActiveAppraisalPeriod = async () => {
    const { data } = await api.get("/active_appraisal_period/");
    return data?.active_appraisal ?? null;
};