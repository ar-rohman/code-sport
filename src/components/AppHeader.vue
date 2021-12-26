<template>
    <header
        class="flex justify-between items-center sticky top-0 h-20 bg-white sm:backdrop-filter sm:backdrop-blur sm:bg-opacity-30"
        :class="{ 'border-b border-gray-200': showBorder }">
        <div class="w-full sm:w-auto flex items-center mx-4 sm:ml-10">
            <button @click="showNavMenu = !showNavMenu" class="sm:hidden p-2">
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
                        d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </button>
            <div class="w-full flex justify-center sm:justify-start mr-8 sm:ml-0">
                <img
                    src="../assets/images/logo/long-logo.png"
                    class="hidden md:block"
                    width="200"
                    height="40"
                    alt="Code Sport" />
                <img
                    src="../assets/images/logo/logo.png"
                    class="md:hidden"
                    width="40"
                    height="40"
                    alt="Code Sport" />
            </div>
        </div>
        <div class="sm:ml-4 sm:mr-10 relative">
            <nav-menu @toggle-nav="showNavMenu = !showNavMenu" :toggle="showNavMenu" />
        </div>
    </header>
</template>

<script>
import NavMenu from './NavMenu.vue';

export default {
    name: 'AppHeader',
    components: {
        NavMenu,
    },
    data() {
        return {
            showNavMenu: false,
            showBorder: false,
        };
    },
    created() {
        window.addEventListener('scroll', this.scrolling);
    },
    unmounted() {
        window.removeEventListener('scroll', this.scrolling);
    },
    methods: {
        scrolling() {
            const bodyScroll = document.body.scrollTop;
            const htmlScroll = document.documentElement.scrollTop;
            const scroll = 10;
            if (bodyScroll > scroll || htmlScroll > scroll) {
                this.showBorder = true;
            } else {
                this.showBorder = false;
            }
        },
    },
    // emits: ['toggle'],
};
</script>
