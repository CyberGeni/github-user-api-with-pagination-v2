<template>
  
    <div v-if="repo">
      <h2>{{ repo.name }}</h2>
      <p>{{ repo.url }}</p>
      <!-- Add more details as needed -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ['id'],
  created() {
    console.log('in created')
    console.log(this.$route.params.id)
  },
  data() {
    return {
      repo: null,
    };
  },
  mounted() {
  // Fetch the repo details based on the route param
  const repoName = this.$route.params.id;
  console.log( repoName);
  console.log('in mounted')
  // Make a GET request to the GitHub API for the repo data
  axios.get(`https://api.github.com/repos/cybergeni/${repoName}`)
    .then((response) => {
      this.repo = response.data;
      console.log( response.data);
      console.log( this.repo);
    })
    .catch((error) => {
      console.log(error);
    });
},

};
</script>
