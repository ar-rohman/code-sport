<template>
    <div class="flex flex-col mb-10" v-for="index in 8" :key="index">
        <div class="mb-2 bg-gray-200 rounded h-6 w-24 animate-pulse"></div>
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-sky-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="pl-6 pr-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Club
                                </th>
                                <th
                                    scope="col"
                                    class="p-3 text-right text-xs font-medium tracking-wider">
                                    <div class="flex justify-end">
                                        <div class="md:hidden">P</div>
                                        <div class="hidden md:table-cell uppercase">Played</div>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="p-3 text-right text-xs font-medium tracking-wider">
                                    <div class="flex justify-end">
                                        <div class="md:hidden">W</div>
                                        <div class="hidden md:table-cell uppercase">Won</div>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="p-3 text-right text-xs font-medium tracking-wider">
                                    <div class="flex justify-end">
                                        <div class="md:hidden">D</div>
                                        <div class="hidden md:table-cell uppercase">Drawn</div>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="p-3 text-right text-xs font-medium tracking-wider">
                                    <div class="flex justify-end">
                                        <div class="md:hidden">L</div>
                                        <div class="hidden md:table-cell uppercase">Lost</div>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="p-3 text-right text-xs font-medium uppercase tracking-wider hidden xs:table-cell">
                                    <div class="flex justify-end">
                                        <div class="md:hidden">GF</div>
                                        <div class="hidden md:table-cell uppercase">Goals For</div>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="p-3 text-right text-xs font-medium uppercase tracking-wider hidden xs:table-cell">
                                    <div class="flex justify-end">
                                        <div class="md:hidden">GA</div>
                                        <div class="hidden md:table-cell uppercase">
                                            Goals Against
                                        </div>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="p-3 text-right text-xs font-medium uppercase tracking-wider hidden xs:table-cell">
                                    <div class="flex justify-end">
                                        <div class="md:hidden">GD</div>
                                        <div class="hidden md:table-cell uppercase">
                                            Goal Difference
                                        </div>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="pl-3 pr-6 text-right text-xs font-medium tracking-wider">
                                    <div class="flex justify-end">
                                        <div class="md:hidden">P</div>
                                        <div class="hidden md:table-cell uppercase">Points</div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="sub in 4" :key="sub">
                                <td class="pl-6 pr-3 py-4 animate-pulse">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img
                                                class="h-10 w-10 rounded-full"
                                                src="../../assets/images/shield-logo-gray.svg" />
                                        </div>
                                        <div
                                            class="ml-4 ztext-xs zxs:text-sm zfont-medium h-4 xs:h-5 w-20 lg:w-48 bg-gray-200 rounded"></div>
                                    </div>
                                </td>
                                <td class="px-3 py-4">
                                    <div class="flex justify-end">
                                        <div
                                            class="w-4 md:w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </td>
                                <td class="px-3 py-4">
                                    <div class="flex justify-end">
                                        <div
                                            class="w-4 md:w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </td>
                                <td class="px-3 py-4 ztext-right ztext-sm">
                                    <div class="flex justify-end">
                                        <div
                                            class="w-4 md:w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </td>
                                <td class="px-3 py-4 ztext-right ztext-sm">
                                    <div class="flex justify-end">
                                        <div
                                            class="w-4 md:w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </td>
                                <td class="px-3 py-4 ztext-right ztext-sm hidden xs:table-cell">
                                    <div class="flex justify-end">
                                        <div
                                            class="w-4 md:w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </td>
                                <td class="px-3 py-4 ztext-right ztext-sm hidden xs:table-cell">
                                    <div class="flex justify-end">
                                        <div
                                            class="w-4 md:w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </td>
                                <td class="px-3 py-4 ztext-right ztext-sm hidden xs:table-cell">
                                    <div class="flex justify-end">
                                        <div
                                            class="w-4 md:w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </td>
                                <td class="pl-3 pr-6 py-4 ztext-right ztext-sm">
                                    <div class="flex justify-end">
                                        <div
                                            class="w-4 md:w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StandingsSkeleton',
};
</script>
