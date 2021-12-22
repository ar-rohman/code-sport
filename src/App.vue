<template>
    <div class="font-sans min-h-screen max-w-screen-xl mx-auto text-gray-700 bg-white">
        <template v-if="showAppHeader">
            <app-header />
        </template>
        <template v-else>
            <back-header />
        </template>
        <main class="m-4 sm:mx-10">
            <router-view />
        </main>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import BackHeader from '@/components/BackHeader.vue';
export default {
    name: 'App',
    components: {
        AppHeader,
        BackHeader,
    },
    computed: {
        showAppHeader() {
            return this.$route.name !== 'TeamDetailPage';
        },
    },
};
</script>
