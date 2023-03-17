<template>
  <div class="p-12">
    <ul class="font-['Anonymous_Pro'] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
      <li class="p-6 border flex items-center" v-for="repo in paginatedRepos" :key="repo.id">
        <router-link :to="{ name: 'repo', params: { id: repo.name } }">
          {{ repo.name }}
        </router-link>
      </li>
    </ul>
    <div class="space-x-4 mt-12">
      <button class="border px-6 py-2" v-if="currentPage > 1" @click="previousPage">Previous</button>
      <span class="border px-6 py-2">{{ currentPage }}</span>
      <span class="border px-6 py-2">{{ currentPage + 1 }}</span>
      <button class="border px-6 py-2" v-if="currentPage < totalPages" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { routerLink } from "vue-router";

export default {
  components: {
    routerLink,
  },
  data() {
    return {
      repos: [],
      perPage: 9,
      currentPage: 1,
      totalPages: 1,
      username: "cybergeni",
    };
  },
  mounted() {
    this.fetchRepos();
  },
  methods: {
    fetchRepos() {
      const apiUrl = `https://api.github.com/users/${this.username}/repos`;
      axios
        .get(apiUrl)
        .then((response) => {
          this.repos = response.data;
          this.totalPages = Math.ceil(this.repos.length / this.perPage);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  computed: {
    paginatedRepos() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.repos.slice(startIndex, endIndex);
    },
  },
};
</script>
