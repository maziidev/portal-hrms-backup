import api from "../../http/axios.js";

export const getUnitSummaryStats = async () => {
    try {
        const [appraisal, leave, promotion] = await Promise.all([
            api.get("/appraisals/stats/"),
            api.get("/leave_stats/"),
            api.get("/promotion_stats/"),
        ]);

        return {
            appraisals: appraisal.data.appraisal_in_progress || 0,
            leaves: leave.data.leave_stats.active_leaves || 0,
            disciplinary: 5, // temporary hardcoded until backend provides endpoint
            promotions: promotion.data.promotion_stats.pending_promotions || 0,
        };
    } catch (err) {
        console.error("Error fetching unit summary stats", err);
        return {
            appraisals: 0,
            leaves: 0,
            disciplinary: 5,
            promotions: 0,
        };
    }
};