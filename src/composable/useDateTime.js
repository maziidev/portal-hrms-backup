import { ref, onMounted, onUnmounted } from 'vue';

export function useDateTime() {
    const formattedDate = ref('');
    const formattedTime = ref('');
    let timer = null;

    const update = () => {
        const now = new Date();

        // Date with suffix
        const day = now.getDate();
        const suffix =
            day >= 11 && day <= 13
                ? 'th'
                : day % 10 === 1
                    ? 'st'
                    : day % 10 === 2
                        ? 'nd'
                        : day % 10 === 3
                            ? 'rd'
                            : 'th';

        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        formattedDate.value = `${day}${suffix} ${month} ${year}`;

        // Time
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        formattedTime.value = `${hours}:${minutes} ${ampm}`;
    };

    onMounted(() => {
        update();
        timer = setInterval(update, 1000);
    });

    onUnmounted(() => clearInterval(timer));

    return { formattedDate, formattedTime };
}
