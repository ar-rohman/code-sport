<template>
    <template v-if="isLoading">
        <TeamDetailSkeleton />
    </template>
    <template v-else>
        <div class="flex gap-4 mb-10">
            <div>
                <img
                    :src="team.crestUrl"
                    :alt="team.shortName"
                    class="h-12 w-auto"
                    v-if="team.crestUrl" />
                <img
                    src="../assets/images/shield-logo.svg"
                    :alt="team.name"
                    class="h-12 w-auto"
                    v-else />
            </div>
            <div>
                <div class="font-bold text-xl">{{ team.shortName }}</div>
                <div class="text-xs text-gray-500">{{ team.name }}</div>
            </div>
        </div>
        <div class="flex gap-8">
            <div
                tabindex="0"
                class="hover:bg-sky-600 hover:text-gray-100 focus:text-gray-100 focus:bg-sky-700 focus:outline-none rounded-full px-4 py-2 text-sm cursor-pointer"
                :class="[!isSquad ? 'bg-sky-500 text-gray-100' : 'bg-white text-sky-500']"
                @click="isSquad = false">
                Detail
            </div>
            <div
                tabindex="0"
                class="hover:bg-sky-600 hover:text-gray-100 focus:text-gray-100 focus:bg-sky-700 focus:outline-none rounded-full px-4 py-2 text-sm cursor-pointer"
                :class="[isSquad ? 'bg-sky-500 text-gray-100' : 'bg-white text-sky-500']"
                @click="isSquad = true">
                Squad
            </div>
        </div>
        <div class="mt-8">
            <div class="shadow-md rounded-lg border border-gray-200 px-6 py-4" v-if="!isSquad">
                <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div>
                        <div class="text-sm text-gray-500">Name</div>
                        <div>{{ team.name }}</div>
                    </div>
                    <div v-if="team.tla">
                        <div class="text-sm text-gray-500">Three Letter Acronym (TLA)</div>
                        <div>{{ team.tla }}</div>
                    </div>
                    <div v-if="team.founded">
                        <div class="text-sm text-gray-500">Founded</div>
                        <div>{{ team.founded }}</div>
                    </div>
                    <div v-if="team.clubColors">
                        <div class="text-sm text-gray-500">Club Colors</div>
                        <div>{{ team.clubColors }}</div>
                    </div>
                    <div v-if="team.venue">
                        <div class="text-sm text-gray-500">Venue</div>
                        <div>{{ team.venue }}</div>
                    </div>
                    <div v-if="team.area">
                        <div class="text-sm text-gray-500">Area</div>
                        <div>{{ team.area.name }}</div>
                    </div>
                    <div v-if="team.address">
                        <div class="text-sm text-gray-500">Address</div>
                        <div>{{ team.address }}</div>
                    </div>
                    <div v-if="team.phone">
                        <div class="text-sm text-gray-500">Phone</div>
                        <div>{{ team.phone }}</div>
                    </div>
                    <div v-if="team.website">
                        <div class="text-sm text-gray-500">Website</div>
                        <div>
                            <a
                                class="text-sky-500 hover:text-sky-600"
                                :href="team.website"
                                target="_blank"
                                rel="noopener"
                                >{{ team.website }}</a
                            >
                        </div>
                    </div>
                    <div v-if="team.email">
                        <div class="text-sm text-gray-500">Email</div>
                        <div>{{ team.email }}</div>
                    </div>
                </div>
                <p></p>
            </div>
            <div v-else>
                <div
                    class="grid gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    v-if="team.squad.length > 0">
                    <div
                        class="shadow-md border border-gray-200 rounded-lg px-6 py-4"
                        v-for="squad in team.squad"
                        :key="squad.id">
                        <div class="flex flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 122.9 122.9"
                                class="h-20 w-20"
                                fill="darkgray"
                                xml:space="preserve">
                                <g>
                                    <path
                                        d="M61.4,0c17,0,32.3,6.9,43.4,18c11.1,11.1,18,26.5,18,43.4c0,17-6.9,32.3-18,43.4c-11.1,11.1-26.5,18-43.4,18 s-32.3-6.9-43.4-18C6.9,93.8,0,78.4,0,61.4c0-17,6.9-32.3,18-43.4C29.1,6.9,44.5,0,61.4,0L61.4,0z M41.3,54.3c-1.1,0-2,0.3-2.5,0.7 c-0.3,0.2-0.6,0.5-0.7,0.8c-0.2,0.4-0.3,0.8-0.2,1.4c0,1.5,0.8,3.5,2.4,5.8l0,0l0,0l5,8c2,3.2,4.1,6.5,6.8,8.9 c2.5,2.3,5.6,3.9,9.6,3.9c4.4,0,7.6-1.6,10.2-4.1c2.7-2.5,4.9-6,7-9.5l5.7-9.3c1.1-2.4,1.4-4,1.2-5c-0.1-0.6-0.8-0.8-1.8-0.9 c-0.2,0-0.5,0-0.7,0c-0.3,0-0.5,0-0.8,0c-0.2,0-0.3,0-0.4,0c-0.5,0-1,0-1.6-0.1l1.9-8.6c-14.4,2.3-25.2-8.4-40.4-2.1L43,54.4 C42.4,54.4,41.8,54.4,41.3,54.3L41.3,54.3L41.3,54.3L41.3,54.3z M18.8,95.7c7.1-2.5,19.6-3.8,25.4-7.7c1-1.3,2.1-2.9,3.1-4.3 c0.6-0.9,1.1-1.7,1.6-2.3c0.1-0.1,0.2-0.2,0.3-0.3c-2.4-2.5-4.4-5.5-6.3-8.5l-5-8C36,61.8,35,59.3,35,57.3c0-1,0.1-1.9,0.5-2.6 c0.4-0.8,1-1.5,1.7-2c0.4-0.2,0.8-0.5,1.2-0.6c-0.3-4.3-0.4-9.8-0.2-14.4c0.1-1.1,0.3-2.2,0.6-3.3c1.3-4.6,4.5-8.3,8.5-10.8 c1.4-0.9,2.9-1.6,4.6-2.2c2.9-1.1,1.5-5.5,4.7-5.6c7.5-0.2,19.8,6.2,24.6,11.4c2.8,3,4.6,7,4.9,12.3l-0.3,13.1l0,0 c1.4,0.4,2.3,1.3,2.7,2.7c0.4,1.6,0,3.8-1.4,6.9l0,0c0,0.1-0.1,0.1-0.1,0.2l-5.7,9.4c-2.2,3.6-4.5,7.3-7.5,10.1L73.7,82l0,0 c0.4,0.5,0.8,1.1,1.2,1.7c0.8,1.1,1.6,2.4,2.5,3.6c5.3,4.5,19.3,5.9,26.7,8.6c7.6-9.4,12.1-21.4,12.1-34.4c0-15.1-6.1-28.8-16-38.7 c-9.9-9.9-23.6-16-38.7-16s-28.8,6.1-38.7,16c-9.9,9.9-16,23.6-16,38.7C6.7,74.4,11.2,86.3,18.8,95.7L18.8,95.7z M77,90.5 c-1.4-1.6-2.8-3.7-4.1-5.5c-0.4-0.5-0.7-1.1-1.1-1.5c-2.7,2-6,3.3-10.3,3.3c-4.5,0-8-1.6-10.9-4.1c0,0,0,0.1-0.1,0.1 c-0.5,0.7-1,1.4-1.6,2.3c-1.1,1.6-2.3,3.3-3.4,4.8C45.6,100,71.1,106,77,90.5L77,90.5z" />
                                </g>
                            </svg>
                            <div class="mt-4">{{ squad.name }}</div>
                        </div>
                        <div class="grid grid-cols-1 2xs:grid-cols-2 mt-6 gap-6">
                            <div v-if="squad.countryOfBirth">
                                <div class="text-xs text-gray-500">Country Of Birth</div>
                                <div>{{ squad.countryOfBirth }}</div>
                            </div>
                            <div v-if="squad.dateOfBirth">
                                <div class="text-xs text-gray-500">Date Of Birth</div>
                                <div>{{ squad.dateOfBirth.split('T')[0] }}</div>
                            </div>
                            <div v-if="squad.nationality">
                                <div class="text-xs text-gray-500">Nationality</div>
                                <div>{{ squad.nationality }}</div>
                            </div>
                            <div v-if="squad.position">
                                <div class="text-xs text-gray-500">Position</div>
                                <div>{{ squad.position }}</div>
                            </div>
                            <div v-if="squad.role">
                                <div class="text-xs text-gray-500">Role</div>
                                <div>{{ stringFormat(squad.role) }}</div>
                            </div>
                            <div v-if="squad.shirtNumber">
                                <div class="text-xs text-gray-500">Shirt Number</div>
                                <div>{{ squad.shirtNumber }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>There is nothing to show</p>
                </div>
            </div>
        </div>
    </template>
    <back-to-top />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BackToTop from '@/components/BackToTop.vue';
import TeamDetailSkeleton from '@/components/skeleton/TeamDetailSkeleton.vue';

export default {
    name: 'TeamDetailPage',
    components: {
        BackToTop,
        TeamDetailSkeleton,
    },
    data() {
        return {
            teamId: null,
            team: [],
            isSquad: false,
            isLoading: true,
        };
    },
    inject: ['stringFormat'],
    created() {
        this.teamId = this.$route.params.id;
        this.teamById().length > 0
            ? this.teamDetailData(this.teamById()[0])
            : this.fetchTeamDetail();
        this.getTeamDetail;
    },
    computed: {
        ...mapGetters('team', ['getTeamDetail']),
    },
    methods: {
        teamById() {
            return this.$store.getters['team/getTeamDetail'](this.teamId);
        },
        async fetchTeamDetail() {
            await this.$axios(`teams/${this.teamId}`)
                .then((response) => {
                    const { data } = response;
                    this.teamDetailData(data);
                    this.setTeamDetail(data);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        },
        teamDetailData(teamDetail) {
            this.team = teamDetail;
            this.isLoading = false;
        },
        ...mapActions('team', ['setTeamDetail']),
    },
};
</script>
