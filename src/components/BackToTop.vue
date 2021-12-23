<template>
    <div v-if="isScroll" class="flex justify-end w-full max-w-screen-xl fixed bottom-4">
        <button
            @click="toTop"
            class="flex justify-center items-center bg-sky-500 rounded-full p-3 mx-8 sm:mx-20 text-white hover:bg-sky-600 focus:bg-sky-700 focus:outline-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: 'BackToTop',
    data() {
        return {
            isScroll: false,
        };
    },
    created() {
        window.addEventListener('scroll', this.scrolling);
    },
    unmounted() {
        window.removeEventListener('scroll', this.scrolling);
    },
    methods: {
        toTop() {
            window.scroll({
                top: 0,
                behavior: 'smooth',
            });
        },
        scrolling() {
            const bodyScroll = document.body.scrollTop;
            const htmlScroll = document.documentElement.scrollTop;
            const screenHeight = screen.height;
            if (bodyScroll > screenHeight || htmlScroll > screenHeight) {
                this.isScroll = true;
            } else {
                this.isScroll = false;
            }
        },
    },
};
</script>
