<template>
    <div>
        <transition
            enter-class="opacity-0"
            enter-active-class="ease-out transition-medium"
            enter-to-class="opacity-100"
            leave-class="opacity-100"
            leave-active-class="ease-out transition-medium"
            leave-to-class="opacity-0">
            <div v-show="isToggle" class="fixed inset-0 transition-opacity sm:hidden">
                <div
                    @click="$emit('toggle-nav', false)"
                    class="absolute inset-0 bg-black opacity-60"
                    tabindex="0"></div>
            </div>
        </transition>
        <nav
            class="fixed left-0 top-0 bottom-0 sm:static bg-white sm:bg-transparent w-full max-w-64 sm:w-auto sm:max-w-none z-10 transform duration-300 ease-in-out sm:transform-none sm:translate-0 overflow-y-auto"
            :class="[isToggle ? 'translate-x-0' : '-translate-x-64']">
            <div class="flex flex-col gap-2 sm:flex-row sm:gap-8 p-6 sm:p-0">
                <div class="sm:hidden mb-4">
                    <img
                        src="../assets/images/logo/long-logo.png"
                        width="150"
                        height="30"
                        alt="Code Sport" />
                </div>
                <div :class="{ 'text-sky-500': isActivePage('/') }">
                    <router-link
                        to="/"
                        @click="$emit('toggle-nav', false)"
                        class="hover:text-sky-500 focus:text-sky-600 focus:outline-none flex items-center h-10"
                        >Home</router-link
                    >
                </div>
                <div :class="{ 'text-sky-500': isActivePage('/matches') }">
                    <router-link
                        to="/matches"
                        @click="$emit('toggle-nav', false)"
                        class="hover:text-sky-500 focus:text-sky-600 focus:outline-none flex items-center h-10"
                        >Matches</router-link
                    >
                </div>
                <div :class="{ 'text-sky-500': isActivePage('/standings') }">
                    <router-link
                        to="/standings"
                        @click="$emit('toggle-nav', false)"
                        class="hover:text-sky-500 focus:text-sky-600 focus:outline-none flex items-center h-10"
                        >Standings</router-link
                    >
                </div>
                <div :class="{ 'text-sky-500': isActivePage('/teams') }">
                    <router-link
                        to="/teams"
                        @click="$emit('toggle-nav', false)"
                        class="hover:text-sky-500 focus:text-sky-600 focus:outline-none flex items-center h-10"
                        >Teams</router-link
                    >
                </div>
                <div :class="{ 'text-sky-500': isActivePage('/scorers') }">
                    <router-link
                        to="/scorers"
                        @click="$emit('toggle-nav', false)"
                        class="hover:text-sky-500 focus:text-sky-600 focus:outline-none flex items-center h-10"
                        >Scorers</router-link
                    >
                </div>
                <div :class="{ 'text-sky-500': isActivePage('/about') }">
                    <router-link
                        to="/about"
                        @click="$emit('toggle-nav', false)"
                        class="hover:text-sky-500 focus:text-sky-600 focus:outline-none flex items-center h-10"
                        >About</router-link
                    >
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavMenu',
    props: ['toggle'],
    data() {
        return {
            width: document.documentElement.clientWidth,
        };
    },
    created() {
        window.addEventListener('resize', this.getScreenSize);
    },
    unmounted() {
        window.removeEventListener('resize', this.getScreenSize);
    },
    methods: {
        isActivePage(page) {
            return this.$route.path === page;
        },
        getScreenSize() {
            this.width = document.documentElement.clientWidth;
        },
    },
    computed: {
        isToggle() {
            const body = document.querySelector('body');
            this.toggle && this.width < 640
                ? body.classList.add('overflow-hidden')
                : body.classList.remove('overflow-hidden');
            return this.toggle;
        },
    },
};
</script>
