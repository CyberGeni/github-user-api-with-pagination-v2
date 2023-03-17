import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import RepoList from './components/RepoList.vue';
import RepoDetail from './components/RepoDetails.vue'
import App from './App.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes:  [
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
    // {
    //   path: '*',
    //   redirect: '/',
    // },
  ],
})

createApp(App).use(router).mount('#app')
