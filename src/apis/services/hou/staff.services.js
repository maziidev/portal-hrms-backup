import api from '../../http/axios.js';

/**
 * =========================
 * STAFF SUMMARY & LIST APIs
 * =========================
 */

export const getStaffSummary = async () => {
    try {
        const { data } = await api.get('/staff_summary_stats/');
        return data.staff_stats || {};
    } catch (err) {
        console.error('Error fetching staff summary:', err);
        throw err;
    }
};

export const getAllStaff = async () => {

    try {
        const { data } = await api.get('/all_staff/');
        return data;
    } catch (err) {
        console.error('Failed to fetch all staff:', err);
        throw err;
    }
};

export const getStaffDetails = async (staffId) => {
    try {
        const { data } = await api.get(`/detailed_staff_info/${Number(staffId)}/`);
        return data;
    } catch (err) {
        console.error(`Failed to fetch staff details for ID ${staffId}:`, err);
        throw err;
    }
};

/**
 * =========================
 * STAFF ACTIVITY FEED APIs
 * =========================
 */

export const fetchLeaves = async (staffId = null, filters = {}) => {
    try {
        const params = staffId ? { staff_id: staffId, ...filters } : filters;
        const { data } = await api.get('/list_leaves/', { params });
        return data.results.map((l) => ({
            id: `leave-${l.id}`,
            staff_name: l.staff.full_name,
            activity: "Leave Application",
            date: l.start_date,
            status: l.status,
            source: "leave",
        }));
    } catch (err) {
        console.error('Error fetching leaves:', err);
        return [];
    }
};

export const fetchAppraisals = async (staffId = null, periodId = null) => {
    try {
        const params = {};
        if (staffId) params.staff_id = staffId;
        if (periodId) params.period_id = periodId;

        const { data } = await api.get('/completed_appraisals/stats/', { params });
        return data.map((a) => ({
            id: `appraisal-${a.id}`,
            staff_name: a.staff_name,
            activity: `Appraisal (${a.period_name})`,
            date: a.date_created.split("T")[0],
            status: a.status.toUpperCase(),
            source: "appraisal",
        }));
    } catch (err) {
        console.error('Error fetching appraisals:', err);
        return [];
    }
};

export const fetchPromotions = async (staffId = null, filters = {}) => {
    try {
        const params = staffId ? { staff_id: staffId, ...filters } : filters;
        const { data } = await api.get('/list_promotions/', { params });

        return data.results.map((p) => ({
            id: `promotion-${p.id}`,
            staff_name: p.staff.full_name,
            activity: `Promotion to ${p.proposed_rank}`,
            date: p.submitted_at.split("T")[0],
            status: p.status,
            source: "promotion",
        }));
    } catch (err) {
        console.error('Error fetching promotions:', err);
        return [];
    }
};

export const fetchStaffActivityFeed = async (staffId = null) => {
    try {
        const [leaves, appraisals, promotions] = await Promise.all([
            fetchLeaves(staffId),
            fetchAppraisals(staffId),
            fetchPromotions(staffId),
        ]);
        return [...leaves, ...appraisals, ...promotions];
    } catch (err) {
        console.error('Error fetching combined staff activity feed:', err);
        return [];
    }
};

