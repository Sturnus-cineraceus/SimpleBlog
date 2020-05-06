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
                :rules="[passrules.required, passrules.min]"
                :type="passwordShow ? 'text' : 'password'"
                name="pass"
                label="password"
                counter
                @click:append="passwordShow = !passwordShow"
                class="inpt"
              ></v-text-field>
              <v-btn rounded color="primary" dark>ログイン</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "login",
  data: () => ({
    password: "",
    user: "",
    passwordShow: false,
    rules: [value => !!value || "Required."],
    passrules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  })
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