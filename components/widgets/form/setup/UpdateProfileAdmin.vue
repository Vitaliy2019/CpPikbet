<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        required
        :rules="[v => !!v || 'Требуется логин']"
        label="Логин"
        placeholder="Введите значение"
        v-model="formModel.Email"
      ></v-text-field>
      <v-text-field
        required
        :rules="[v => !!v || 'Требуется пароль']"
        label="Пароль"
        placeholder="Введите значение"
        v-model="formModel.Password"
      ></v-text-field>
      <v-select
        v-model="formModel.Roles"
        :items="items"
        :rules="[v => !!v || 'Требуется роль']"
        label="Роль"
        required
      ></v-select>
      <v-btn :disabled="!valid" color="success" @click="validate">Сохранить</v-btn>

      <v-btn color="error" @click="reset">Сбросить форму</v-btn>

      <v-btn color="warning" @click="resetValidation">Сбросить проверку</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "update-profile-admin",
  data() {
    return {
      valid: true,
      formModel: {
        Email: "",
        Password: "",
        Roles: "admin"
      },
      items: ["admin"]
    };
  },
  async created() {
    const { userAdminPanel } = await this.$axios.$get(
      "/api/App/getEditeProfile"
    );
    
    this.formModel = Object.assign({}, userAdminPanel);
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        const { rc } = await this.$axios.$put(
          "/api/App/updateProfile",
          this.formModel
        );
        if (rc === "ok") {
          this.$notify({
            title: "Выполнено",
            type: "success",
            message: "Данные обновлены!"
          });
        } else {
          this.$notify({
            title: "Внимание!",
            type: "error",
            message: rc
          });
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
