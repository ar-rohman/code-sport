<template>
    <h1 class="font-bold text-xl mb-8">Standings</h1>
    <template v-if="isLoading">
        <StandingsSkeleton />
    </template>
    <template v-else>
        <div class="flex flex-col mb-10" v-for="(value, index) in standings" :key="index">
            <div class="mb-2 font-semibold text-gray-600">{{ stringFormat(value.group) }}</div>
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-sky-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="pl-6 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Club
                                    </th>
                                    <th
                                        scope="col"
                                        class="p-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="flex justify-end">
                                            <div class="md:hidden">P</div>
                                            <div class="hidden md:table-cell uppercase">Played</div>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="p-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="flex justify-end">
                                            <div class="md:hidden">W</div>
                                            <div class="hidden md:table-cell uppercase">Won</div>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="p-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="flex justify-end">
                                            <div class="md:hidden">D</div>
                                            <div class="hidden md:table-cell uppercase">Drawn</div>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="p-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="flex justify-end">
                                            <div class="md:hidden">L</div>
                                            <div class="hidden md:table-cell uppercase">Lost</div>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">
                                        <div class="flex justify-end">
                                            <div class="md:hidden">GF</div>
                                            <div class="hidden md:table-cell uppercase">
                                                Goals For
                                            </div>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">
                                        <div class="flex justify-end">
                                            <div class="md:hidden">GA</div>
                                            <div class="hidden md:table-cell uppercase">
                                                Goals Against
                                            </div>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">
                                        <div class="flex justify-end">
                                            <div class="md:hidden">GD</div>
                                            <div class="hidden md:table-cell uppercase">
                                                Goal Difference
                                            </div>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="pl-3 pr-6 text-right text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="flex justify-end">
                                            <div class="md:hidden">P</div>
                                            <div class="hidden md:table-cell uppercase">Points</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="(tableValue, tableIndex) in value.table"
                                    :key="tableIndex">
                                    <td class="pl-6 pr-3 py-4">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img
                                                    class="h-10 w-10 rounded-full"
                                                    :src="tableValue.team.crestUrl"
                                                    :alt="tableValue.team.name" />
                                            </div>
                                            <div
                                                class="ml-4 text-xs xs:text-sm font-medium text-gray-900">
                                                {{ tableValue.team.name }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-3 py-4 text-right text-sm text-gray-500">
                                        {{ tableValue.playedGames }}
                                    </td>
                                    <td class="px-3 py-4 text-right text-sm text-gray-500">
                                        {{ tableValue.won }}
                                    </td>
                                    <td class="px-3 py-4 text-right text-sm text-gray-500">
                                        {{ tableValue.draw }}
                                    </td>
                                    <td class="px-3 py-4 text-right text-sm text-gray-500">
                                        {{ tableValue.lost }}
                                    </td>
                                    <td
                                        class="px-3 py-4 text-right text-sm text-gray-500 hidden xs:table-cell">
                                        {{ tableValue.goalsFor }}
                                    </td>
                                    <td
                                        class="px-3 py-4 text-right text-sm text-gray-500 hidden xs:table-cell">
                                        {{ tableValue.goalsAgainst }}
                                    </td>
                                    <td
                                        class="px-3 py-4 text-right text-sm text-gray-500 hidden xs:table-cell">
                                        {{ tableValue.goalDifference }}
                                    </td>
                                    <td class="pl-3 pr-6 py-4 text-right text-sm text-gray-500">
                                        {{ tableValue.points }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <back-to-top />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BackToTop from '@/components/BackToTop.vue';
import StandingsSkeleton from '@/components/skeleton/StandingsSkeleton.vue';

export default {
    name: 'StandingsPage',
    components: {
        BackToTop,
        StandingsSkeleton,
    },
    data() {
        return {
            standings: null,
            isLoading: true,
        };
    },
    inject: ['stringFormat'],
    created() {
        this.getStanding.length > 0 ? this.standingData(this.getStanding) : this.fetchStanding();
    },
    computed: {
        ...mapGetters({
            getStanding: 'standing/getStanding',
        }),
    },
    methods: {
        async fetchStanding() {
            await this.$axios('competitions/2001/standings')
                .then((response) => {
                    const { standings } = response.data;
                    this.standingData(standings);
                    this.setStanding(standings);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        standingData(standing) {
            this.standings = standing.filter((item) => {
                return item.table.length > 0;
            });
            this.isLoading = false;
        },
        ...mapActions({
            setStanding: 'standing/set',
        }),
    },
};
</script>
