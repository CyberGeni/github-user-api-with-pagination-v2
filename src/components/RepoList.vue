<template>
  <div class="p-12">
    <ul
      class="font-['Anonymous_Pro'] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12"
    >
      <li v-for="repo in paginatedRepos" :key="repo.id" class="h-auto">
        <router-link
          class="p-6 border hover:border-y-4 hover:border-sky-600 transition-all flex flex-col text-left h-full"
          :to="`/repo/${repo.name}`"
        >
          name: {{ repo.name }}
          <p class="opacity-90 my-2" v-if="repo.description">
            <span>{{ repo.description }}</span>
          </p>
          <p class="opacity-75" v-if="!repo.description">
            <span class="opacity-50 italic"> no description</span>
          </p>
        </router-link>
      </li>
    </ul>
    <!-- <div class="space-x-4 mt-12">
      <button class="border px-6 py-2" v-if="currentPage > 1" @click="previousPage">Previous</button>
      <span class="border px-4 py-2">{{ currentPage }}</span>
      <span class="border px-4 py-2">{{ currentPage + 1 }}</span>
      <button class="border px-6 py-2" v-if="currentPage < totalPages" @click="nextPage">Next</button>
    </div> -->
    <div class="space-x-4 mt-12">
      <!-- <button @click="goToPage(1)" :disabled="currentPage === 1">First</button> -->
      <button
        class="border p-2 disabled:bg-slate-700"
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
            fill="rgba(186,230,253,1)"
          />
        </svg>
      </button>
      <button
        class="border px-4 py-2"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="goToPage(pageNumber)"
        :class="{ active: currentPage === pageNumber }"
      >
        {{ pageNumber }}
      </button>
      <button
        class="border p-2 disabled:bg-slate-700 "
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
            fill="rgba(186,230,253,1)"
          />
        </svg>
      </button>
      <!-- <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
      >
        Last
      </button> -->
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
      repos: [], // Your fetched repository data
      pageSize: 6, // Number of items to display per page
      currentPage: 1, // The current page number
    };
  },
  computed: {
    paginatedRepos() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.repos.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.repos.length / this.pageSize);
    },
  },
  methods: {
    async fetchRepos() {
      console.log('Fetching repositories...');
     
      const response = await axios.get('https://api.github.com/users/cybergeni/repos?per_page=100');
      this.repos = response.data;
      console.log(this.repos[0].open_graph_image_url);
    },
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
  },
  mounted() {
    this.fetchRepos();
  },
};
</script>
<style scoped>
.active {
  background-color: rgba(186, 230, 253, 1);
  color: rgba(0, 0, 0, 1);
}
</style>