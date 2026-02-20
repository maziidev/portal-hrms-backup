
import { getDeanFacultyStats } from "@/apis/management/dean.js";
import { useAuthStore } from "@/store/auth.js";
import { ref } from 'vue';

export function useDeanStats() {
    const stats = ref({
        total_departments: 0,
        total_staff: 0,
        active_appraisals: 0,
        pending_reviews: 0,
        promotion_requests: 0,
        total_leaves: 0
    });

    const loading = ref(false);
    const error = ref(null);
    const authStore = useAuthStore();

    const fetchStats = async () => {
        // Accessing the getter directly from authStore
        const fId = authStore.facultyId;

        if (!fId) {
            error.value = 'Faculty ID not found';
            return;
        }

        loading.value = true;
        error.value = null;

        try {
            const { data } = await getDeanFacultyStats(fId);

            // Bridge the backend "mistakes" to our clean UI state
            stats.value = {
                total_departments: data.total_departments || 0,
                total_staff: data.total_staff || 0,
                active_appraisals: data.active_appraisals || 0,
                pending_reviews: data.active_appraisals || 0,
                promotion_requests: data.total_promotions || 0,
                total_leaves: data.total_leaves || 0
            };
        } catch (err) {
            error.value = err.response?.data?.message || err.message || 'Failed to load Statistics';
        } finally {
            loading.value = false;
        }
    };

    return { stats, loading, error, fetchStats };
}