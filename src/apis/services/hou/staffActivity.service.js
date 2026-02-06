import api from "../../http/axios.js";

/**
 * Fetch staff activity feed
 * Combines leaves, appraisals, promotions
 */
export async function fetchStaffActivityFeed() {
    const [leavesRes, appraisalsRes, promotionsRes] = await Promise.all([
        api.get("/list_leaves/"),
        api.get("/completed_appraisals/stats/"),
        api.get("/list_promotions/")
    ]);

    const leaves = leavesRes.data.results.map((l) => ({
        id: `leave-${l.id}`,
        staff_name: l.staff.full_name,
        activity: "Leave Application",
        date: l.start_date,
        status: l.status,
        source: "leave"
    }));

    const appraisals = appraisalsRes.data.map((a) => ({
        id: `appraisal-${a.id}`,
        staff_name: a.staff_name,
        activity: `Appraisal (${a.period_name})`,
        date: a.date_created.split("T")[0],
        status: a.status.toUpperCase(),
        source: "appraisal"
    }));

    const promotions = promotionsRes.data.results.map((p) => ({
        id: `promotion-${p.id}`,
        staff_name: p.staff.full_name,
        activity: `Promotion to ${p.proposed_rank}`,
        date: p.submitted_at.split("T")[0],
        status: p.status,
        source: "promotion"
    }));

    return [...leaves, ...appraisals, ...promotions];
}
