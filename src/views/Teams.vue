<template>
    <div>
        <h1 class="font-bold text-xl mb-8">Teams</h1>
        <div
            class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            <div
                tabindex="0"
                v-for="team in teams"
                :key="team.id"
                @click="teamDetail(team.id)"
                class="flex flex-col justify-between gap-4 p-4 shadow rounded-lg border border-gray-200 cursor-pointer group hover:bg-sky-100 focus:bg-sky-200 focus:outline-none">
                <div class="flex items-center justify-center">
                    <img
                        :src="team.image"
                        :alt="team.name"
                        width="80"
                        ssheight="50"
                        v-if="team.isValidImage" />
                    <img
                        src="../assets/images/logo/logo.png"
                        :alt="team.name"
                        width="80"
                        ssheight="50"
                        v-else />
                </div>
                <div class="group-hover:text-sky-600 group-focus:text-sky-700 text-center">
                    {{ team.shortName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TeamsPage',
    data() {
        return {
            teams: [],
        };
    },
    created() {
        this.getTeams();
    },
    methods: {
        async getTeams() {
            await this.$axios('competitions/2001/teams')
                .then((response) => {
                    const { teams } = response.data;
                    let newTeams = [];
                    teams.forEach(async (team) => {
                        newTeams.push({
                            id: team.id,
                            name: team.name,
                            shortName: team.shortName,
                            image: team.crestUrl,
                            isValidImage: !!team.crestUrl,
                        });
                    });
                    this.teams = newTeams;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        teamDetail(id) {
            console.log(id);
        },
    },
};
</script>
