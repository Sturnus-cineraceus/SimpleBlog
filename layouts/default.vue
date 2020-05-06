<template>
  <v-app light>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/">
        <v-toolbar-title class="titlebar" v-text="title" />
      </nuxt-link>
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
      copylight: conf.copylight
    };
  }
};
</script>
<style>
.titlebar {
  margin-left: 2em;
}
</style>