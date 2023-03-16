<template>
  <div>
    <h1>My Repositories</h1>
    <ul>
      <li v-for="repo in paginatedRepos" :key="repo.id">
        <router-link :to="{ name: 'repo', params: { id: repo.name } }">{{ repo.name }}</router-link>
      </li>
    </ul>
    <div>
      <button v-if="currentPage > 1" @click="previousPage">Previous</button>
      <span>{{ currentPage }}</span>
      <button v-if="currentPage < totalPages" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { routerLink } from 'vue-router';

export default {
  components: {
    routerLink
  },
  data() {
    return {
      repos: [],
      perPage: 10,
      currentPage: 1,
      totalPages: 1,
      username: 'cybergeni',
    };
  },
  mounted() {
    this.fetchRepos();
  },
  methods: {
    fetchRepos() {
      const apiUrl = `https://api.github.com/users/${this.username}/repos`;
      axios.get(apiUrl)
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
