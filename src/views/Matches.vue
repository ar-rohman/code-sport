<template>
    <h1 class="font-bold text-xl mb-8">Matches</h1>
    <template v-if="isLoading">
        <MatchSkeleton />
    </template>
    <template v-else>
        <template v-for="(dataMatch, idx) in matches" :key="idx">
            <div class="flex flex-col mb-10" v-if="dataMatch.data.length > 0">
                <div class="mb-2 font-semibold text-gray-600" :id="dataMatch.stage">
                    {{ stringFormat(dataMatch.stage) }}
                </div>
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
                                            {{ isShow(dataMatch.isScore) ? 'Score' : '' }}
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Away
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                                            v-if="isShow(dataMatch.isGroup)">
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
                                    <template v-for="(match, index) in dataMatch.data" :key="index">
                                        <tr class="sm:hidden">
                                            <td class="px-6 pt-4 text-xs text-gray-400" colspan="2">
                                                {{ dateFormat(match.utcDate, country) }}
                                            </td>
                                            <td
                                                class="px-6 pt-4 text-xs text-right text-gray-400"
                                                v-if="isShow(dataMatch.isGroup)">
                                                {{ stringFormat(match.group) }}
                                            </td>
                                        </tr>
                                        <tr class="border-b border-gray-200">
                                            <td
                                                class="px-6 pb-4 sm:py-4 text-sm text-gray-500 hidden sm:table-cell">
                                                {{ dateFormat(match.utcDate, country) }}
                                            </td>
                                            <td class="px-6 py-4 text-right text-sm text-gray-500">
                                                {{ match.homeTeam }}
                                            </td>
                                            <td class="px-6 py-4 text-center text-sm text-gray-500">
                                                {{
                                                    isShow(dataMatch.isScore)
                                                        ? `${match.score.homeTeam} : ${match.score.awayTeam}`
                                                        : 'vs'
                                                }}
                                            </td>
                                            <td class="px-6 py-4 text-sm text-gray-500">
                                                {{ match.awayTeam }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell"
                                                v-if="isShow(dataMatch.isGroup)">
                                                {{ stringFormat(match.group) }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                                                {{ stringFormat(match.status) }}
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
    </template>
    <back-to-top />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BackToTop from '@/components/BackToTop.vue';
import MatchSkeleton from '@/components/skeleton/MatchSkeleton.vue';

export default {
    name: 'MatchesPage',
    components: {
        BackToTop,
        MatchSkeleton,
    },
    data() {
        return {
            matches: null,
            country: 'ID',
            isLoading: true,
        };
    },
    inject: ['stringFormat', 'dateFormat'],
    created() {
        this.getMatch.length > 0 ? this.matchData(this.getMatch) : this.fetchMatch();
        this.getCountry();
    },
    mounted() {
        const section = this.$router.currentRoute.value.hash.replace('#', '');
        if (section) {
            this.$nextTick(() => {
                const sectionId = document.getElementById(section);
                if (sectionId) {
                    this.$nextTick(() => {
                        const headerOffset = 100;
                        const elementPosition = sectionId.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth',
                        });
                    });
                }
            });
        }
    },
    computed: {
        ...mapGetters({
            getMatch: 'match/getMatch',
        }),
    },
    methods: {
        async fetchMatch() {
            await this.$axios('competitions/2001/matches')
                .then((response) => {
                    const { matches } = response.data;
                    this.matchData(matches);
                    this.setMatch(matches);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        matchData(data) {
            let currentStage;
            let dataMatches = [];
            data.map((element) => {
                if (element.stage === currentStage) {
                    dataMatches.map((el) => {
                        if (el.stage === element.stage) {
                            el.data.push({
                                awayTeam: element.awayTeam.name,
                                homeTeam: element.homeTeam.name,
                                score: {
                                    awayTeam: element.score.fullTime.awayTeam,
                                    homeTeam: element.score.fullTime.homeTeam,
                                },
                                group: element.group,
                                status: element.status,
                                utcDate: element.utcDate,
                            });
                            el.isGroup.push(element.group);
                            el.isScore.push(element.score.fullTime.homeTeam);
                            el.isScore.push(element.score.fullTime.awayTeam);
                        }
                    });
                } else {
                    dataMatches.push({
                        stage: element.stage,
                        data: [
                            {
                                awayTeam: element.awayTeam.name,
                                homeTeam: element.homeTeam.name,
                                score: {
                                    awayTeam: element.score.fullTime.awayTeam,
                                    homeTeam: element.score.fullTime.homeTeam,
                                },
                                group: element.group,
                                status: element.status,
                                utcDate: element.utcDate,
                            },
                        ],
                        isGroup: [element.group],
                        isScore: [element.score.fullTime.homeTeam, element.score.fullTime.awayTeam],
                    });
                }
                currentStage = element.stage;
            });
            this.matches = dataMatches;
            this.isLoading = false;
        },
        ...mapActions({
            setMatch: 'match/set',
        }),
        // Get country code
        async getCountry() {
            await this.$axios('https://ip2c.org/s', true)
                .then((response) => {
                    const { data } = response;
                    const country = data.split(';')[1] || navigator.language;
                    this.country = country;
                })
                .catch(() => {
                    this.country = navigator.language;
                });
        },
        isShow(someArray) {
            // Tests whether at least one element is true
            // make sure that is null and not 0
            return someArray.some((element) => (element === 0 ? true : !!element));
        },
    },
};
</script>
