<template>
  <v-app light>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="6">
            <nuxt-link to="/">
              <v-toolbar-title class="titlebar" v-text="title" />
            </nuxt-link>
          </v-col>
          <v-col cols="6">
            <v-text-field
              class="searchform"
              label="Search"
              single-line
              append-icon="mdi-magnify"
              @click:append="doSearch"
              @keydown.enter="doSearch"
              v-model="searchtext"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} {{copylight}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import appconf from "../app.config";
const conf = appconf.default;

export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      title: conf.title,
      copylight: conf.copylight,
      searchtext: ""
    };
  },
  methods: {
    doSearch: function() {
      this.$router.push({ path: "/search?word=" + this.searchtext });
    }
  }
};
</script>
<style>
.titlebar {
  margin-left: 2em;
}

.searchform {
  max-width: 30em;
}
</style>