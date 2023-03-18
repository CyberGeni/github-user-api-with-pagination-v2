<template>
  <div class="p-12 relative w-full">
    <div v-if="loading" class="h-[60vh] flex items-center justify-center">
      loading...
    </div>
    <ul
      v-if="!loading"
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
  </div>
  <div
    class="bg-solid flex items-center justify-center space-x-4 mt-12 py-6 backdrop-blur-sm fixed left-0 w-fit px-6 right-0 bottom-0 mx-auto"
  >
    <button
      class="border h-fit p-2 disabled:bg-neutral-500 disabled:opacity-40"
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
    v-for="pageNumber in pagesToShow"
      class="hover:border-sky-600 border border-sky-200/10 px-4 py-2 m-2"
      :key="pageNumber"
          :class="{ active: pageNumber === currentPage, disabled: pageNumber === '...'}"
          @click="pageNumber !== '...' ? currentPage = pageNumber : ''"
    >
      {{ pageNumber }}
    </button>
    <button
      class="h-fit border p-2 disabled:bg-neutral-500 disabled:opacity-40"
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
      loading: true,
      repos: [], // Your fetched repository data
      pageSize: 6, // Number of items to display per page
      currentPage: 1, // The current page number
      pagesToShowCount: 5, // The number of page buttons to display
      ellipsisThreshold: 5, // The number of pages to show before and after the current page
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
    pagesToShow() {
      const pages = [];
      let startPage = Math.max(1, this.currentPage - Math.floor(this.pagesToShowCount / 2));
      let endPage = Math.min(startPage + this.pagesToShowCount - 1, this.totalPages);

      if (endPage - startPage < this.ellipsisThreshold) {
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      } else {
        if (startPage > 1) {
          pages.push('...');
        }
        const offset = this.ellipsisThreshold - 2;
        const middlePage = Math.floor((startPage + endPage) / 2);
        startPage = middlePage - offset;
        endPage = middlePage + offset;
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        if (endPage < this.totalPages) {
          pages.push('...');
        }
      }

      return pages;
    },
    hasNextPage() {
      return this.currentPage < this.totalPages;
    },
  },
  methods: {
    async fetchRepos() {
      console.log("Fetching repositories...");
      this.loading = true;
      const response = await axios.get(
        "https://api.github.com/users/cybergeni/repos?per_page=100"
      );
      this.repos = response.data;
      this.loading = false;
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
