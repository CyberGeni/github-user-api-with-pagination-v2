<template>
  <div
    v-if="repo"
    class="font-['Anonymous_Pro'] h-[85vh] flex flex-col items-center justify-center"
  >
    <div class="flex flex-col w-5/6 md:w-3/5 max-w-xl">
      <button class="w-fit border px-3 py-1 my-4">
        <router-link class="flex items-center justify-center" to="/">
          <svg
            class="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
              fill="rgba(186,230,253,1)"
            />
          </svg>
          go back
        </router-link>
      </button>
      <div class="border p-4 text-left space-y-3">
        <h2><span>REPO NAME:</span> {{ repo.name }}</h2>
        <h2><span>DESCRIPTION:</span> {{ repo.description }}<span v-if="!repo.description" class="opacity-50 italic"> no description</span></h2>
        <h2><span>LANGUAGE:</span> {{ repo.language }}</h2>
        <h2><span>STARGAZERS:</span> {{ repo.stargazers_count }}</h2>
        <h2><span>FORKS:</span> {{ repo.forks }}</h2>
        <h2><span>LAST UPDATED AT:</span> {{ formateDate(repo.updated_at) }}</h2>
      </div>
      <button class="w-fit border px-3 pr-2 py-1 my-4 self-end">
        <a class="flex items-center justify-center" :href="repo.html_url">
          go to repo on github
          <svg
            class="ml-2 rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
              fill="rgba(186,230,253,1)"
            />
          </svg>
        </a>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  created() {
    // console.log("in created");
    // console.log(this.$route.params.id);
  },
  data() {
    return {
      repo: null,
    };
  },
  mounted() {
    // Fetch the repo details based on the route param
    const repoName = this.$route.params.id;
    // console.log(repoName);
    // console.log("in mounted");
    // Make a GET request to the GitHub API for the repo data
    axios
      .get(`https://api.github.com/repos/cybergeni/${repoName}`)
      .then((response) => {
        this.repo = response.data;
        console.log(response.data);
        console.log(this.repo);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    formateDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>
