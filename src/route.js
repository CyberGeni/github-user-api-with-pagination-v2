import Vue from 'vue';
import Router from 'vue-router';
import RepoList from './components/RepoList.vue';
import RepoDetail from './components/RepoDetail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'repoList',
      component: RepoList,
    },
    {
      path: '/repo/:id',
      name: 'repo',
      component: RepoDetail,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
