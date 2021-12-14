<template>
    <div class="font-sans min-h-screen max-w-screen-xl mx-auto text-gray-700 bg-white">
        <app-header />
        <main class="m-4 sm:mx-10">
            <router-view />
        </main>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
    name: 'App',
    components: {
        AppHeader,
    },
};
</script>
