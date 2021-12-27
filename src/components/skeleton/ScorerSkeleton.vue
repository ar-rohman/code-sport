<template>
    <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="index in 10" :key="index" class="animate-pulse">
            <td class="px-6 py-4 max-w-0 hidden xs:table-cell">
                <div class="h-5 w-10 bg-gray-200 rounded"></div>
            </td>
            <td class="px-6 py-4">
                <div class="h-5 bg-gray-200 w-3/4 rounded"></div>
                <div class="h-3 w-2/3 bg-gray-200 rounded sm:hidden mt-1"></div>
            </td>
            <td class="px-6 py-4 hidden sm:table-cell">
                <div class="h-5 w-3/4 bg-gray-200 rounded"></div>
            </td>
            <td class="px-6 py-4">
                <div class="flex justify-end">
                    <div class="h-5 w-10 bg-gray-200 rounded"></div>
                </div>
            </td>
            <td class="px-6 py-4 flex justify-end">
                <div class="flex justify-end">
                    <div class="h-5 w-10 bg-gray-200 rounded"></div>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name: 'ScorerSkeleton',
};
</script>
