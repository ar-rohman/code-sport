<template>
    <div>
        <h1 class="font-bold text-xl mb-8">Teams</h1>
        <template v-if="isLoading">
            <TeamSkeleton />
        </template>
        <template v-else>
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
                            class="object-contain w-24 h-24"
                            :src="team.image"
                            :alt="team.name"
                            v-if="team.isValidImage" />
                        <img
                            class="object-contain w-24 h-24"
                            src="../assets/images/shield-logo.svg"
                            :alt="team.name"
                            v-else />
                    </div>
                    <div class="group-hover:text-sky-600 group-focus:text-sky-700 text-center">
                        {{ team.shortName }}
                    </div>
                </div>
            </div>
        </template>
        <back-to-top />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BackToTop from '@/components/BackToTop.vue';
import TeamSkeleton from '@/components/skeleton/TeamSkeleton.vue';

export default {
    name: 'TeamsPage',
    components: {
        BackToTop,
        TeamSkeleton,
    },
    data() {
        return {
            teams: [],
            isLoading: true,
        };
    },
    created() {
        this.getTeam.length > 0 ? this.teamData(this.getTeam) : this.fetchTeam();
    },
    computed: {
        ...mapGetters({
            getTeam: 'team/getTeam',
        }),
    },
    methods: {
        async fetchTeam() {
            await this.$axios('competitions/2001/teams')
                .then((response) => {
                    const { teams } = response.data;
                    this.teamData(teams);
                    this.setTeam(teams);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        teamData(teams) {
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
            this.isLoading = false;
        },
        ...mapActions({
            setTeam: 'team/setTeam',
        }),
        teamDetail(id) {
            this.$router.push({ path: `/team/${id}` });
        },
    },
};
</script>
