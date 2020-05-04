<template>
  <v-app id="top">
    <BlogList />
  </v-app>
</template>
<script>
import BlogList from "../components/BlogList";
export default {
  name: "top",
  components: { BlogList },
  data: function() {
    return {};
  }
};
</script>
<style>
</style>