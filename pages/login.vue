<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="../static/favicon.png"
                    alt="панель управления сайтом Pikbet"
                    width="120"
                    height="120"
                  >
                  <h1 class="flex my-4 primary--text display-1 text-xs-center">Вход в панель управления Pikbet</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="email"
                    label="Логин"
                    type="text"
                    v-model="email"
                    :error-messages="emailErrors"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Пароль"
                    id="password"
                    type="password"
                    v-model="password"
                    :error-messages="passwordErrors"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                  <vue-recaptcha
                    ref="invisibleRecaptcha"
                    @verify="onVerify"
                    @expired="onExpired"
                    size="invisible"
                    sitekey="6LfZuqcUAAAAAKm_TlDV3SWrAhrUpejjlOJ_FAV5"
                  ></vue-recaptcha>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import VueRecaptcha from "vue-recaptcha";
export default {
  layout: "default",
  components: { VueRecaptcha },
  mixins: [validationMixin],
  validations: {
    password: { required },
    email: { required, email }
  },
  head: {
    title: "Авторизация для входа в личный кабинет",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Авторизация для входа в личный кабинет"
      }
    ]
  },
  data: () => ({
    loading: false,
    email: "acrtr@yandex.ru",
    password: "123"
  }),
  computed: {
    sitekey() {
      return this.$store.state.sitekeyRecaptcha;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Требуется пароль.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("E-mail должен быть правильный");
      !this.$v.email.required && errors.push("Требуется e-mail");
      return errors;
    }
  },
  created() {
    this.$v.$touch();
  },
  methods: {
    login() {
      //this.loading = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        debugger;
        this.$refs.invisibleRecaptcha.execute();
      }
    },
    onVerify: async function(response) {
      try {
        this.loading = true;
        debugger;
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        this.$router.push("/");
      } catch (e) {
        // this.error = e.response.data
        debugger;
        this.$notify({
          type: "error",
          title: "Внимание",
          message: e.response.data
        });

        this.resetRecaptcha();
        /* this.$message({
            message: 'Неверный логин или пароль',
            type: 'error'
          }) */
      }
    },
    onExpired: function() {},
    resetRecaptcha() {
      this.loading = false;
      this.$refs.invisibleRecaptcha.reset(); // Direct call reset method
    }
  }
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
