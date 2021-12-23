<template>
    <div>
        <h1 class="font-bold text-xl mb-8">Stats</h1>
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-sky-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-0 hidden xs:table-cell">
                                    #
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Player
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                    Team
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Goals
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rank
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(scorer, index) in scorers" :key="index">
                                <td
                                    class="px-6 py-4 text-sm text-gray-500 max-w-0 hidden xs:table-cell">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-500">
                                    <div class="">{{ scorer.player }}</div>
                                    <div class="text-xs text-gray-400 sm:hidden">
                                        {{ scorer.team }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                                    {{ scorer.team }}
                                </td>
                                <td class="px-6 py-4 text-right text-sm text-gray-500">
                                    {{ scorer.goal }}
                                </td>
                                <td class="px-6 py-4 text-right text-sm text-gray-500">
                                    {{ scorer.rank }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="my-8 flex justify-center" v-if="showLoadMore">
            <button
                class="bg-sky-500 text-gray-100 hover:bg-sky-600 focus:bg-sky-700 focus:outline-none rounded-full px-4 py-2 text-sm"
                @click="loadMore">
                Load more
            </button>
        </div>
        <back-to-top />
    </div>
</template>

<script>
import BackToTop from '@/components/BackToTop.vue';

export default {
    name: 'StatsPage',
    components: {
        BackToTop,
    },
    data() {
        return {
            scorers: [],
            fullScorers: [],
            tenScorers: [],
            showLoadMore: true,
        };
    },
    created() {
        this.getScores();
    },
    methods: {
        async getScores() {
            await this.$axios('competitions/2001/scorers?limit=1000000')
                .then((response) => {
                    const { scorers } = response.data;
                    scorers.sort((a, b) => b.numberOfGoals - a.numberOfGoals);
                    let rank = 1;
                    let goal = 0;
                    const newScorers = scorers.map((element, index) => {
                        if (index > 0 && element.numberOfGoals < goal) {
                            rank++;
                        }
                        goal = element.numberOfGoals;
                        return {
                            player: element.player.name,
                            team: element.team.name,
                            goal: element.numberOfGoals,
                            rank: rank,
                        };
                    });
                    this.scorers = newScorers.slice(0, 10);
                    this.fullScorers = newScorers;
                    this.tenScorers = newScorers.slice(0, 10);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        loadMore() {
            this.scorers = this.fullScorers;
            this.showLoadMore = false;
        },
    },
};
</script>
