import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/matches',
        name: 'Matches',
        component: () => import(/* webpackChunkName: "matches" */ '../views/Matches.vue'),
    },
    {
        path: '/standings',
        name: 'Standings',
        component: () => import(/* webpackChunkName: "standings" */ '../views/Standings.vue'),
    },
    {
        path: '/teams',
        name: 'Teams',
        component: () => import(/* webpackChunkName: "teams" */ '../views/Teams.vue'),
    },
    {
        path: '/team/:id',
        name: 'Team Detail',
        component: () => import(/* webpackChunkName: "teams" */ '../views/TeamDetail.vue'),
    },
    {
        path: '/scorers',
        name: 'Scorers',
        component: () => import(/* webpackChunkName: "scorers" */ '../views/Scorers.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

const defaultTitle = 'Code Sport';
router.afterEach((to) => {
    document.title = to.name ? `${to.name} - ${defaultTitle}` : defaultTitle;
});

export default router;
