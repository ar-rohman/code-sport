<template>
    <div>
        <h1 class="font-bold text-xl mb-8">Standings</h1>
        <div class="flex flex-col mb-10" v-for="(value, index) in standings" :key="index">
            <div class="mb-2 font-bold text-gray-500">{{ stringFormat(value.group) }}</div>
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-sky-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Club
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="sm:hidden text-center has-tooltip">
                                            <span
                                                class="tooltip rounded shadow-lg py-2 px-4 bg-sky-100 text-sky-500 -mt-8"
                                                >Played</span
                                            >
                                            P
                                        </div>
                                        <div class="hidden sm:table-cell uppercase">Played</div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="sm:hidden text-center has-tooltip">
                                            <span
                                                class="tooltip rounded shadow-lg py-2 px-4 bg-sky-100 text-sky-500 mr-8 -mt-8"
                                                >Won</span
                                            >
                                            W
                                        </div>
                                        <div class="hidden sm:table-cell uppercase">Won</div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="sm:hidden text-center has-tooltip">
                                            <span
                                                class="tooltip rounded shadow-lg py-2 px-4 bg-sky-100 text-sky-500 -mt-8"
                                                >Drawn</span
                                            >D
                                        </div>
                                        <div class="hidden sm:table-cell uppercase">Drawn</div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="sm:hidden text-center has-tooltip">
                                            <span
                                                class="tooltip rounded shadow-lg py-2 px-4 bg-sky-100 text-sky-500 -mt-8"
                                                >Lost</span
                                            >L
                                        </div>
                                        <div class="hidden sm:table-cell uppercase">Lost</div>
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                        Goals For
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                        Goals Against
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                        Goal Difference
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        <div class="sm:hidden text-center has-tooltip">
                                            <span
                                                class="tooltip rounded shadow-lg py-2 px-4 bg-sky-100 text-sky-500 -mt-8"
                                                >Points</span
                                            >P
                                        </div>
                                        <div class="hidden sm:table-cell uppercase">Points</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="(tableValue, tableIndex) in value.table"
                                    :key="tableIndex">
                                    <td class="px-3 py-4">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10 has-tooltip">
                                                <span
                                                    class="tooltip rounded shadow-lg py-2 px-4 bg-sky-100 text-sky-500 -mt-8 xs:hidden"
                                                    >{{ tableValue.team.name }}</span
                                                >
                                                <img
                                                    class="h-10 w-10 rounded-full"
                                                    :src="tableValue.team.crestUrl"
                                                    :alt="tableValue.team.name" />
                                            </div>
                                            <div class="ml-4 text-sm font-medium text-gray-900">
                                                <div class="hidden xs:table-cell">
                                                    {{ tableValue.team.name }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-3 py-4 text-center text-sm text-gray-500">
                                        {{ tableValue.playedGames }}
                                    </td>
                                    <td class="px-3 py-4 text-center text-sm text-gray-500">
                                        {{ tableValue.won }}
                                    </td>
                                    <td class="px-3 py-4 text-center text-sm text-gray-500">
                                        {{ tableValue.draw }}
                                    </td>
                                    <td class="px-3 py-4 text-center text-sm text-gray-500">
                                        {{ tableValue.lost }}
                                    </td>
                                    <td
                                        class="px-3 py-4 text-center text-sm text-gray-500 hidden sm:table-cell">
                                        {{ tableValue.goalsFor }}
                                    </td>
                                    <td
                                        class="px-3 py-4 text-center text-sm text-gray-500 hidden sm:table-cell">
                                        {{ tableValue.goalsAgainst }}
                                    </td>
                                    <td
                                        class="px-3 py-4 text-center text-sm text-gray-500 hidden md:table-cell">
                                        {{ tableValue.goalDifference }}
                                    </td>
                                    <td class="px-3 py-4 text-center text-sm text-gray-500">
                                        {{ tableValue.points }}
                                    </td>
                                </tr>
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
    name: 'StandingsPage',
    data() {
        return {
            standings: null,
        };
    },
    created() {
        this.getStandings();
    },
    methods: {
        stringFormat(string) {
            // Replace underscore to space
            const replaceString = string.replace(/_/g, ' ');
            // Capitalized each first word
            const capitalized = replaceString.replace(
                /\w\S*/g,
                (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
            return capitalized;
        },
        async getStandings() {
            await this.$axios('standings')
                .then((response) => {
                    const { standings } = response.data;
                    this.standings = standings.filter((item) => {
                        return item.table.length > 0;
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
    },
};
</script>
