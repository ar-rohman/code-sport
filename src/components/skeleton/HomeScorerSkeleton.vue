<template>
    <div class="flex justify-between mb-2 animate-pulse">
        <div class="h-5 xs:h-6 bg-gray-200 w-1/3 rounded"></div>
        <div class="self-end h-4 bg-gray-200 w-20 rounded"></div>
    </div>
    <div class="flex flex-col gap-4">
        <div
            class="flex justify-between px-6 py-4 rounded-lg shadow-md border border-gray-200 bg-white animate-pulse"
            v-for="index in 5"
            :key="index">
            <div class="flex flex-col justify-between mb-2 w-2/3">
                <div class="h-5 bg-gray-200 w-2/3 rounded mb-1"></div>
                <div class="h-4 bg-gray-200 w-20 rounded"></div>
            </div>
            <div class="flex flex-col items-center justify-center">
                <div class="h-5 bg-gray-200 w-16 rounded mb-1"></div>
                <div class="h-4 bg-gray-200 w-10 rounded"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeScorerSkeleton',
};
</script>
