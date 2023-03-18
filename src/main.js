import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import RepoList from "./components/RepoList.vue";
import RepoDetail from "./components/RepoDetails.vue";
import NotFound from "./components/NotFound.vue";
import App from "./App.vue";
import "./index.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "RepoList",
      component: RepoList,
      props: true,
    },
    {
      path: "/repo/:id",
      name: "repo",
      component: RepoDetail,
      props: true,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

createApp(App).use(router).mount("#app");
