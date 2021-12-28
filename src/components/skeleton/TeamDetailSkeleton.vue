<template>
    <div class="flex gap-4 mb-10 animate-pulse">
        <div>
            <img src="../../assets/images/shield-logo-gray.svg" class="h-12 w-auto" />
        </div>
        <div>
            <div class="h-6 bg-gray-200 w-40 rounded mb-1"></div>
            <div class="h-4 bg-gray-200 w-28 rounded"></div>
        </div>
    </div>
    <div class="flex gap-8">
        <div class="bg-sky-500 text-gray-100 rounded-full px-4 py-2 text-sm">Detail</div>
        <div class="rounded-full px-4 py-2 text-sm text-sky-500">Squad</div>
    </div>
    <div class="mt-8">
        <div class="shadow-md rounded-lg border border-gray-200 px-6 py-4">
            <div class="grid gap-4 grid-cols-1 md:grid-cols-2 animate-pulse">
                <div>
                    <div class="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-60 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div class="h-4 w-56 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-10 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div class="h-4 w-20 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-16 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div class="h-4 w-28 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-36 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div class="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-32 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div class="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div class="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-64 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div class="h-4 w-14 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-28 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div class="h-4 w-14 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-48 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div class="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                    <div class="h-6 w-52 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TeamDetailSkeleton',
};
</script>
