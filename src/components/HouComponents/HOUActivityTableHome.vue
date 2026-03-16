<script setup>
import { getLeaveList, getPromotionList } from "@/apis/management/staff";
import { NDataTable, NDatePicker, NInput, useMessage } from 'naive-ui';
import { computed, h, onMounted, ref } from 'vue';

const message = useMessage();
const rawActivity = ref([]);
const loading = ref(false);

const searchKeyword = ref('');
const dateRange = ref(null);

const fetchUnifiedActivity = async () => {
    loading.value = true;
    try {
        const [leaves, promotions] = await Promise.all([
            getLeaveList({ page: 1 }),
            getPromotionList({ page: 1 })
        ]);

        const leaveItems = (leaves.data?.results || []).map(item => ({
            name: item.staff?.full_name || item.staff?.email || 'Unknown Staff',
            activity: `Requested ${item.leave_type} Leave`,
            timestamp: new Date(item.created_at || item.start_date).getTime(),
            status: item.status || 'pending',
        }));

        const promoItems = (promotions.data?.results || []).map(item => ({
            name: item.staff?.full_name || item.staff?.email || 'Unknown Staff',
            activity: `Promotion Request: ${item.proposed_rank?.name || 'New Rank'}`,
            timestamp: new Date(item.submitted_at || item.created_at).getTime(),
            status: item.status || 'pending',
        }));

        rawActivity.value = [...leaveItems, ...promoItems].sort((a, b) => b.timestamp - a.timestamp);

    } catch (err) {
        if (err.response?.status === 401) {
            message.error("Session expired. Please log in again.");
        } else {
            message.error("Failed to sync unit activities");
        }
    } finally {
        loading.value = false;
    }
};

const columns = [
    {
        title: 'Staff Name',
        key: 'name',
        align: 'left', // Changed to left
        render: (row) => h('span', { class: 'font-black text-orbit-bg uppercase tracking-tighter' }, row.name)
    },
    {
        title: 'Activity',
        key: 'activity',
        align: 'left', // Changed to left
        render: (row) => h('span', { class: 'text-gray-500 font-bold uppercase text-[11px]' }, row.activity)
    },
    {
        title: 'Date',
        key: 'timestamp',
        align: 'left', // Changed to left
        render: (row) => h('div', { class: 'flex items-center space-x-2' }, [
            h('img', { src: '/assets/img/calendar.png', class: 'w-4 h-4 opacity-60' }),
            h('span', { class: 'text-gray-400 font-bold text-[11px]' },
                isNaN(row.timestamp) ? 'N/A' : new Date(row.timestamp).toLocaleDateString('en-GB')
            )
        ])
    },
    {
        title: 'Status',
        key: 'status',
        align: 'left', // Changed to left
        render: (row) => {
            const status = row.status?.toLowerCase();
            const styleMap = {
                approved: 'bg-[#00FF00]/10 text-[#00FF00]',
                completed: 'bg-[#00FF00]/10 text-[#00FF00]',
                pending: 'bg-[#FF8C00]/10 text-[#FF8C00]',
                recorded: 'bg-orbit-blue/10 text-orbit-bg'
            };
            return h('div', {
                class: `inline-flex items-center justify-center font-black p-3 w-32 rounded-xl uppercase text-[10px] tracking-widest ${styleMap[status] || styleMap.pending}`
            }, status);
        }
    }
];

// Limit to top 6 items only
const displayData = computed(() => {
    let data = [...rawActivity.value];
    if (searchKeyword.value) {
        const kw = searchKeyword.value.toLowerCase();
        data = data.filter(i => i.name.toLowerCase().includes(kw) || i.activity.toLowerCase().includes(kw));
    }
    if (dateRange.value) {
        const [start, end] = dateRange.value;
        data = data.filter(i => i.timestamp >= start && i.timestamp <= end);
    }
    return data.slice(0, 6); // Hard limit to 6 items
});

onMounted(fetchUnifiedActivity);
</script>

<template>
    <div class="mt-10">
        <div class="p-8 flex flex-col xl:flex-row xl:items-center xl:justify-between bg-white rounded-t-[3rem] border-x border-t border-gray-100 gap-6">
            <div class="text-left">
                <h4 class="font-black text-3xl text-orbit-bg italic tracking-tighter uppercase leading-none">Unit Activity Feed</h4>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Latest 6 Operations</p>
            </div>

            <div class="flex flex-wrap items-center gap-4">
                <n-input
                    v-model:value="searchKeyword"
                    placeholder="SEARCH..."
                    size="large"
                    style="width: 220px; --n-border-radius: 16px;"
                    clearable
                />
                <n-date-picker
                    v-model:value="dateRange"
                    type="daterange"
                    clearable
                    size="large"
                    style="width: 280px; --n-border-radius: 16px;"
                />
            </div>
        </div>

        <div class="bg-white border-x border-b border-gray-100 px-6 pb-10 rounded-b-[3rem]">
            <n-data-table
                :columns="columns"
                :data="displayData"
                :loading="loading"
                :bordered="false"
                class="orbit-activity-table"
            />
        </div>
    </div>
</template>

<style scoped>
:deep(.orbit-activity-table .n-data-table-td) {
    padding: 24px 12px !important;
    border-bottom: 1px solid #f1f5f9 !important;
}

:deep(.orbit-activity-table .n-data-table-th) {
    background-color: transparent !important;
    text-align: left !important;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.1em;
    color: #94a3b8;
}

:deep(.orbit-activity-table .n-data-table-tr:hover) {
    background-color: #f8fafc;
}
</style>