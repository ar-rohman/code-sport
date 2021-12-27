import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: Home,
    },
    {
        path: '/matches',
        name: 'MatchesPage',
        component: () => import(/* webpackChunkName: "matches" */ '../views/Matches.vue'),
    },
    {
        path: '/standings',
        name: 'StandingsPage',
        component: () => import(/* webpackChunkName: "standings" */ '../views/Standings.vue'),
    },
    {
        path: '/teams',
        name: 'TeamsPage',
        component: () => import(/* webpackChunkName: "teams" */ '../views/Teams.vue'),
    },
    {
        path: '/team/:id',
        name: 'TeamDetailPage',
        component: () => import(/* webpackChunkName: "teams" */ '../views/TeamDetail.vue'),
    },
    {
        path: '/scorers',
        name: 'ScorersPage',
        component: () => import(/* webpackChunkName: "scorers" */ '../views/Scorers.vue'),
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
