import { ref, computed, onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import {
    getDepartmentAppraisals,
    getDepartmentPromotions,
    getDepartmentLeaves
} from '@/apis/management/dean';

export function useActivityFeed(departmentId) {
    const feed = ref([]);
    const loading = ref(false);
    const message = useMessage();

    // Helper to format each API result into { message, time } objects
    const mapAppraisals = (items) =>
        items.map(a => ({
            type: 'appraisal',
            message: `${a.hod_name || 'HOD'} submitted appraisal report`,
            time: a.submitted_at || a.date || new Date().toISOString()
        }));

    const mapPromotions = (items) =>
        items.map(p => ({
            type: 'promotion',
            message: `Promotion recommendation for ${p.staff_name || 'staff'}`,
            time: p.recommended_at || p.date || new Date().toISOString()
        }));

    const mapLeaves = (items) =>
        items.map(l => ({
            type: 'leave',
            message: `${l.staff_name || 'Staff'} leave request pending review`,
            time: l.requested_at || l.date || new Date().toISOString()
        }));

    const fetchFeed = async () => {
        if (!departmentId) return;
        loading.value = true;
        try {
            const [appraisalsRes, promotionsRes, leavesRes] = await Promise.all([
                getDepartmentAppraisals(departmentId),
                getDepartmentPromotions(departmentId),
                getDepartmentLeaves(departmentId)
            ]);

            const combined = [
                ...mapAppraisals(appraisalsRes.data || []),
                ...mapPromotions(promotionsRes.data || []),
                ...mapLeaves(leavesRes.data || [])
            ];

            // Sort by time descending
            feed.value = combined.sort((a, b) => new Date(b.time) - new Date(a.time));
        } catch (err) {
            message.error('Failed to fetch activity feed');
            feed.value = [];
        } finally {
            loading.value = false;
        }
    };

    onMounted(fetchFeed);

    return { feed, loading, fetchFeed };
}