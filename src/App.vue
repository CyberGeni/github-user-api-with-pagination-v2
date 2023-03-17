<template class="">
  <div class="bg-zinc-900 min-h-screen text-sky-200">
    <header class="border-b border-sky-600 py-6">
      <div class="font-['VT323'] text-3xl">cybergenie</div>
    </header>
    <main class="w-5/6 border-x border-sky-600 mx-auto h-full ">
      <RepoList />
    </main>
    
  </div>
</template>

<script>
import RepoList from "./components/RepoList.vue";

export default {
  name: "App",
  components: {
    RepoList,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
