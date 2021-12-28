<template>
    <div class="flex flex-col mb-10">
        <div
            class="mb-2 font-semibold text-gray-600 w-64 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-sky-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Home
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Score
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Away
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                    Group
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <template v-for="index in 50" :key="index">
                                <tr class="sm:hidden animate-pulse">
                                    <td class="px-6 pt-4" colspan="2">
                                        <div class="h-4 w-24 rounded bg-gray-200"></div>
                                    </td>
                                    <td class="px-6 pt-4">
                                        <div class="flex justify-end">
                                            <div class="h-4 w-24 rounded bg-gray-200"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-200 animate-pulse">
                                    <td class="px-6 pb-4 sm:py-4 hidden sm:table-cell">
                                        <div class="h-5 w-48 rounded bg-gray-200"></div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex justify-end">
                                            <div class="h-5 w-32 rounded bg-gray-200"></div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex justify-center">
                                            <div class="h-5 w-12 rounded bg-gray-200"></div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="h-5 w-32 rounded bg-gray-200"></div>
                                    </td>
                                    <td class="px-6 py-4 hidden sm:table-cell">
                                        <div class="h-5 w-16 rounded bg-gray-200"></div>
                                    </td>
                                    <td class="px-6 py-4 hidden lg:table-cell">
                                        <div class="h-5 w-24 rounded bg-gray-200"></div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MatchSkeleton',
};
</script>
