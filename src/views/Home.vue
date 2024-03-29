<template>
    <div>
        <div class="bg-gradient-to-r from-sky-700 to-gray-900 rounded-2xl">
            <div
                class="bg-left-top bg-contain bg-no-repeat flex flex-col md:justify-between md:flex-row-reverse p-8 gap-10"
                :style="{ 'background-image': `url(${require('@/assets/images/ucl-logo.svg')})` }">
                <div class="flex justify-center md:justify-end items-center md:pr-4">
                    <img src="../assets/images/uefa.png" alt="uefa-logo" class="h-28 min-w-max" />
                </div>
                <div class="flex flex-col justify-center">
                    <div class="text-white font-bold text-base xs:text-xl md:text-3xl">
                        Champions League {{ season }}
                    </div>
                    <div class="text-gray-300 text-sm mt-3 md:pr-10">
                        The UEFA Champions League is an annual club football competition organised
                        by the Union of European Football Associations.
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <div>
                <template v-if="isMatchLoading">
                    <HomeMatchSkeleton />
                </template>
                <template v-else>
                    <div class="flex justify-between mb-1">
                        <div class="font-bold text-base xs:text-lg">Matches</div>
                        <div
                            class="text-sm text-sky-500 self-end cursor-pointer"
                            @click="matchPage(matchLink)">
                            View all
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div
                            class="px-6 py-4 rounded-lg shadow-md border border-gray-200 bg-white"
                            v-for="match in matches"
                            :key="match.id">
                            <div class="flex justify-between">
                                <div>{{ match.homeTeam.name }}</div>
                                <div class="font-bold text-sm">
                                    {{ shortDayMonth(match.utcDate) }}
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <div>{{ match.awayTeam.name }}</div>
                                <div class="text-sm text-gray-500">
                                    {{ timeFormat(match.utcDate) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div>
                <template v-if="isMatchLoading">
                    <HomeMatchSkeleton />
                </template>
                <template v-else>
                    <div class="flex justify-between mb-1">
                        <div class="font-bold text-base xs:text-lg">Results</div>
                        <div
                            class="text-sm text-sky-500 self-end cursor-pointer"
                            @click="matchPage(resultLink)">
                            View all
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div
                            class="px-6 py-4 rounded-lg shadow-md border border-gray-200 bg-white"
                            v-for="result in results"
                            :key="result.id">
                            <div class="flex justify-between">
                                <div>{{ result.homeTeam.name }}</div>
                                <div>{{ result.score.fullTime.homeTeam }}</div>
                            </div>
                            <div class="flex justify-between">
                                <div>{{ result.awayTeam.name }}</div>
                                <div>{{ result.score.fullTime.awayTeam }}</div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div>
                <template v-if="isScorerLoading">
                    <HomeScorerSkeleton />
                </template>
                <template v-else>
                    <div class="flex justify-between mb-1">
                        <div class="font-bold text-base xs:text-lg">Top Scorer</div>
                        <div
                            class="text-sm text-sky-500 self-end cursor-pointer"
                            @click="scorerPage">
                            View all
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div
                            class="flex justify-between px-6 py-4 rounded-lg shadow-md border border-gray-200 bg-white"
                            v-for="(scorer, index) in scorers"
                            :key="index">
                            <div class="flex justify-between flex-col">
                                <div class="mb-1">{{ scorer.player }}</div>
                                <div class="text-sm text-gray-500">{{ scorer.team }}</div>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <div class="font-bold">{{ scorer.goal }}</div>
                                <div class="text-xs">Goals</div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HomeMatchSkeleton from '@/components/skeleton/HomeMatchSkeleton.vue';
import HomeScorerSkeleton from '@/components/skeleton/HomeScorerSkeleton.vue';

export default {
    name: 'HomePage',
    components: {
        HomeMatchSkeleton,
        HomeScorerSkeleton,
    },
    data() {
        return {
            matches: [],
            results: [],
            scorers: [],
            season: null,
            matchLink: null,
            resultLink: null,
            isMatchLoading: true,
            isScorerLoading: true,
        };
    },
    inject: ['timeFormat', 'shortDayMonth'],
    created() {
        this.getMatch.length > 0 ? this.matchData(this.getMatch) : this.fetchMatch();
        this.getScorer.length > 0 ? this.scorerData(this.getScorer) : this.fetchScorer();
    },
    computed: {
        ...mapGetters({
            getMatch: 'match/getMatch',
            getScorer: 'scorer/getScorer',
        }),
    },
    methods: {
        async fetchMatch() {
            await this.$axios('competitions/2001/matches')
                .then((response) => {
                    const data = response.data.matches;
                    this.matchData(data);
                    this.setMatch(data);
                })
                .catch((error) => {
                    // console.log('ini eror', error.toJSON());
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log('response.data', error.response.data);
                        console.log('response.status', error.response.status);
                        console.log('response.headers', error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('request', error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log('config', error.config);
                });
        },
        async fetchScorer() {
            await this.$axios('competitions/2001/scorers?limit=1000000')
                .then((response) => {
                    const { scorers } = response.data;
                    this.scorerData(scorers);
                    this.setScorer(scorers);
                })
                .catch((error) => {
                    console.log(error.toJSON());
                });
        },
        matchData(match) {
            const scheduled = match.filter((element) => {
                return element.status.toUpperCase() === 'SCHEDULED';
            });
            this.matches = scheduled.slice(0, 5);
            this.matchLink = this.matches[0].stage;
            const finished = match.filter((element) => {
                return element.status.toUpperCase() === 'FINISHED';
            });
            this.results = finished.slice(-5).reverse();
            this.resultLink = this.results[0].stage;

            const season = match[0].season;
            const startSeason = season.startDate.split('-')[0];
            const endSeason = season.endDate.split('-')[0];
            this.season = `${startSeason} - ${endSeason}`;
            this.isMatchLoading = false;
        },
        scorerData(scorers) {
            scorers.sort((a, b) => b.numberOfGoals - a.numberOfGoals);
            const newScorers = scorers.map((element) => {
                return {
                    player: element.player.name,
                    team: element.team.name,
                    goal: element.numberOfGoals,
                };
            });
            this.scorers = newScorers.slice(0, 5);
            this.isScorerLoading = false;
        },
        ...mapActions({
            setMatch: 'match/set',
            setScorer: 'scorer/set',
        }),
        matchPage(hash) {
            this.$router.push({ path: `/matches`, hash: `#${hash}` });
        },
        scorerPage() {
            this.$router.push({ path: `/scorers` });
        },
    },
};
</script>
