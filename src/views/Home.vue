<template>
    <div>
        <div class="bg-gradient-to-r from-sky-700 to-gray-900 rounded-2xl">
            <div
                class="bg-left-top bg-contain bg-no-repeat flex flex-col md:justify-between md:flex-row-reverse p-8 gap-10"
                :style="{ 'background-image': `url(${require('@/assets/images/ucl-logo2.svg')})` }">
                <div class="flex justify-center md:justify-end items-center md:pr-4">
                    <img src="../assets/images/uefa-w.png" alt="uefa-logo" class="h-28 min-w-max" />
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
        <div class="mt-10">
            <div class="flex justify-between mb-2">
                <div class="font-bold text-base xs:text-lg">Matches</div>
                <div class="text-sm text-sky-500">View all</div>
            </div>
            <div class="flex flex-col gap-4">
                <div
                    class="px-6 py-4 rounded-lg shadow-md border border-gray-200"
                    v-for="match in matches"
                    :key="match.id">
                    <div class="flex justify-between">
                        <div class="">{{ match.homeTeam.name }}</div>
                        <div class="font-bold text-sm">{{ shortDayMonth(match.utcDate) }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="">{{ match.awayTeam.name }}</div>
                        <div class="text-sm text-gray-500">{{ timeFormat(match.utcDate) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10">
            <div class="flex justify-between mb-2">
                <div class="font-bold text-base xs:text-lg">Results</div>
                <div class="text-sm text-sky-500">View all</div>
            </div>
            <div class="flex flex-col gap-4">
                <div
                    class="px-6 py-4 rounded-lg shadow-md border border-gray-200"
                    v-for="result in results"
                    :key="result.id">
                    <div class="flex justify-between">
                        <div class="">{{ result.homeTeam.name }}</div>
                        <div class="">{{ result.score.fullTime.homeTeam }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="">{{ result.awayTeam.name }}</div>
                        <div class="">{{ result.score.fullTime.awayTeam }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10">
            <div class="flex justify-between mb-2">
                <div class="font-bold text-base xs:text-lg">Top Scorer</div>
                <div class="text-sm text-sky-500">View all</div>
            </div>
            <div class="flex flex-col gap-4">
                <div
                    class="flex justify-between px-6 py-4 rounded-lg shadow-md border border-gray-200"
                    v-for="(scorer, index) in scorers"
                    :key="index">
                    <div class="flex justify-between flex-col">
                        <div class="">{{ scorer.player.name }}</div>
                        <div class="text-sm text-gray-500">{{ scorer.team.name }}</div>
                    </div>
                    <div class="flex items-center">
                        <div class="font-bold">{{ scorer.numberOfGoals }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            matches: [],
            results: [],
            scorers: [],
            season: null,
        };
    },
    created() {
        this.getMatches();
        this.getScores();
    },
    methods: {
        async getMatches() {
            await this.$axios('competitions/2001/matches')
                .then((response) => {
                    const data = response.data.matches;
                    const scheduled = data.filter((element) => {
                        return element.status.toUpperCase() === 'SCHEDULED';
                    });
                    this.matches = scheduled.slice(0, 5);

                    const finished = data.filter((element) => {
                        return element.status.toUpperCase() === 'FINISHED';
                    });
                    this.results = finished.slice(-5).reverse();

                    const season = data[0].season;
                    const startSeason = season.startDate.split('-')[0];
                    const endSeason = season.endDate.split('-')[0];
                    this.season = `${startSeason} - ${endSeason}`;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        async getScores() {
            await this.$axios('competitions/2001/scorers?limit=5')
                .then((response) => {
                    this.scorers = response.data.scorers;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        shortDayMonth(date) {
            const dt = new Date(date);
            const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(dt);
            const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(dt);
            return `${day} ${month}`;
        },
        timeFormat(date) {
            return new Intl.DateTimeFormat('en', {
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
            }).format(new Date(date));
        },
    },
};
</script>
