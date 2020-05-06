<template>
  <v-app id="login">
    <div class="loginall">
      <v-row>
        <v-col align="center">
          <v-card class="logincard">
            <div class="loginparts">
              <v-text-field
                label="user"
                v-model="user"
                :rules="rules"
                hide-details="auto"
                class="inpt"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules"
                :type="passwordShow ? 'text' : 'password'"
                name="pass"
                label="password"
                counter
                @click:append="passwordShow = !passwordShow"
                class="inpt"
              ></v-text-field>
              <v-btn rounded color="primary" @click="onLogin">ログイン</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>
<script>
import appconf from "../../app.config";
const conf = appconf.default;

export default {
  name: "login",
  data: () => ({
    password: "",
    user: "",
    passwordShow: false,
    rules: [value => !!value || "Required."]
  }),
  methods: {
    onLogin: async function() {
      if (!this.password || !this.user) {
        return;
      }

      let url = conf.api_url + "/auth/local";
      let data = {
        identifier: this.user,
        password: this.password
      };
      try {
        let res = await this.$axios.post(url, data);
        this.$store.commit("auth/set", res.data);
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      } finally {
        this.user = "";
        this.password = "";
      }
    }
  }
};
</script>
<style>
.loginall {
  margin: 3em;
}
.loginparts {
  width: 80%;
  margin: 1em;
  padding: 1em;
}
.logincard {
  max-width: 500px;
}
.inpt {
  max-width: 25em;
}
</style>