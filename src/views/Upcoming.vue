<template>
    <h1 class="font-bold text-xl mb-8">Upcoming Matches</h1>
    <div class="mb-2 font-semibold text-gray-600">
        <pre>{{ upcoming }}</pre>
    </div>
</template>

<script>
export default {
    name: 'UpcomingMatch',
    data() {
        return {
            upcoming: [],
        };
    },
    created() {
        this.getMatches();
        // this.getCountry();
    },
    methods: {
        async getMatches() {
            await this.$axios('competitions/2001/matches')
                .then((response) => {
                    const { matches } = response.data;
                    const upcoming = matches.filter((element) => {
                        return element.status.toUpperCase() === 'SCHEDULED';
                    });
                    this.upcoming = matches;
                    console.log(matches);
                    console.log(upcoming);
                    // let currentStage;
                    // let dataMatches = [];
                    // matches.map((element) => {
                    //     if (element.stage === currentStage) {
                    //         dataMatches.map((el) => {
                    //             if (el.stage === element.stage) {
                    //                 el.data.push({
                    //                     awayTeam: element.awayTeam.name,
                    //                     homeTeam: element.homeTeam.name,
                    //                     score: {
                    //                         awayTeam: element.score.fullTime.awayTeam,
                    //                         homeTeam: element.score.fullTime.homeTeam,
                    //                     },
                    //                     group: element.group,
                    //                     status: element.status,
                    //                     utcDate: element.utcDate,
                    //                 });
                    //                 el.isGroup.push(element.group);
                    //                 el.isScore.push(element.score.fullTime.homeTeam);
                    //                 el.isScore.push(element.score.fullTime.awayTeam);
                    //             }
                    //         });
                    //     } else {
                    //         dataMatches.push({
                    //             stage: element.stage,
                    //             data: [
                    //                 {
                    //                     awayTeam: element.awayTeam.name,
                    //                     homeTeam: element.homeTeam.name,
                    //                     score: {
                    //                         awayTeam: element.score.fullTime.awayTeam,
                    //                         homeTeam: element.score.fullTime.homeTeam,
                    //                     },
                    //                     group: element.group,
                    //                     status: element.status,
                    //                     utcDate: element.utcDate,
                    //                 },
                    //             ],
                    //             isGroup: [element.group],
                    //             isScore: [
                    //                 element.score.fullTime.homeTeam,
                    //                 element.score.fullTime.awayTeam,
                    //             ],
                    //         });
                    //     }
                    //     currentStage = element.stage;
                    // });
                    // if (this.routeHash === '#SCHEDULED') {
                    //     this.matches = dataMatches.map((element) => {
                    //         element.data = element.data.filter((data) => {
                    //             return data.status.toUpperCase() === 'SCHEDULED';
                    //         });
                    //         return element;
                    //     });
                    // } else if (this.routeHash === '#FINISHED') {
                    //     const finished = dataMatches.map((element) => {
                    //         element.data = element.data.filter((data) => {
                    //             return data.status.toUpperCase() === 'FINISHED';
                    //         });
                    //         return element;
                    //     });
                    //     this.matches = finished.reverse();
                    // } else {
                    //     this.matches = dataMatches;
                    // }
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
    },
};
</script>
