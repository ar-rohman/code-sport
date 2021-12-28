<template>
    <div
        class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        <div
            v-for="index in 74"
            :key="index"
            class="flex flex-col justify-between gap-4 p-4 shadow rounded-lg border border-gray-200">
            <div class="flex items-center justify-center animate-pulse">
                <img
                    src="../../assets/images/shield-logo-gray.svg"
                    class="object-contain w-24 h-24 abg-white text-gray-200" />
            </div>
            <div class="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TeamSkeleton',
};
</script>
