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
    return {
      sample: [
        { title: "hei", body: "rerrew" },
        { title: "yaa", body: "tewt" },
        { title: "da", body: "twewte" }
      ]
    };
  }
};
</script>
<style>
</style>