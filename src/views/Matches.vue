<template>
    <div>
        <h1 class="font-bold text-xl mb-8">Matches</h1>
        <div class="flex flex-col mb-10" v-for="(dataMatch, idx) in matches" :key="idx">
            <div class="mb-2 font-semibold text-gray-600">{{ stringFormat(dataMatch.stage) }}</div>
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-sky-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        :class="[
                                            isShow(dataMatch.isScore) ? 'text-right' : 'text-left',
                                        ]">
                                        Home
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        v-show="isShow(dataMatch.isScore)">
                                        Score
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Away
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                                        v-show="isShow(dataMatch.isGroup)">
                                        Group
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <template v-for="(match, index) in dataMatch.data" :key="index">
                                    <tr class="sm:hidden">
                                        <td class="px-3 pt-4 text-xs text-gray-400" colspan="2">
                                            {{ dateFormat(match.utcDate) }}
                                        </td>
                                        <td
                                            class="px-3 pt-4 text-xs text-right text-gray-400"
                                            v-show="isShow(dataMatch.isGroup)">
                                            {{ stringFormat(match.group) }}
                                        </td>
                                    </tr>
                                    <tr class="border-b border-gray-200">
                                        <td
                                            class="px-3 pb-4 text-sm text-gray-500 hidden sm:table-cell">
                                            {{ dateFormat(match.utcDate) }}
                                        </td>
                                        <td
                                            class="px-3 py-4 text-sm text-gray-500"
                                            :class="{ 'text-right': isShow(dataMatch.isScore) }">
                                            {{ match.homeTeam }}
                                        </td>
                                        <td
                                            class="px-3 py-4 text-center text-sm text-gray-500"
                                            v-show="isShow(dataMatch.isScore)">
                                            {{ match.score.homeTeam }} :
                                            {{ match.score.awayTeam }}
                                        </td>
                                        <td class="px-3 py-4 text-sm text-gray-500">
                                            {{ match.awayTeam }}
                                        </td>
                                        <td
                                            class="px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                                            v-show="isShow(dataMatch.isGroup)">
                                            {{ stringFormat(match.group) }}
                                        </td>
                                        <td
                                            class="px-3 py-4 text-sm text-gray-500 hidden lg:table-cell">
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
    </div>
</template>

<script>
export default {
    name: 'MatchesPage',
    data() {
        return {
            matches: null,
            country: 'ID',
        };
    },
    created() {
        this.getStandings();
        this.getCountry();
    },
    methods: {
        stringFormat(string) {
            if (!string) return;
            // Replace underscore to space
            const replaceString = string.replace(/_/g, ' ');
            // Capitalized each first word
            const capitalized = replaceString.replace(
                /\w\S*/g,
                (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
            return capitalized;
        },
        dateFormat(date) {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // get timezone eg. Asia/Jakarta
            return new Intl.DateTimeFormat(this.country, {
                hour12: false,
                year: '2-digit',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
                timeZone: timezone,
            }).format(new Date(date));
        },
        async getStandings() {
            await this.$axios('matches')
                .then((response) => {
                    const { matches } = response.data;
                    let currentStage;
                    let dataMatches = [];
                    matches.map((element) => {
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
                                isScore: [
                                    element.score.fullTime.homeTeam,
                                    element.score.fullTime.awayTeam,
                                ],
                            });
                        }
                        currentStage = element.stage;
                    });
                    console.log(dataMatches);
                    this.matches = dataMatches;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
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
