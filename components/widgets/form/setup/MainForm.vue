<template>
  <v-form v-model="valid">
    <v-subheader class="pa-0 mt-3">Системные настройки</v-subheader>

    <v-text-field
      v-model="item.Value"
      v-for="item in dataSetup"
      :key="item.Id"
      :label="item.Name"
      :name="'it'+item.Id"
      placeholder="Введите значение"
      :value="item.Value"
      v-validate="'required'"
      :data-vv-name="'name'+item.Id"
      :error-messages="errors.collect('name'+item.Id)"
      required
    ></v-text-field>

    <div class="form-btn">
      <v-btn outline @click="submit" color="primary">Сохранить</v-btn>
      <v-btn outline @click="clear">Очистить</v-btn>
    </div>
  </v-form>
</template>

<script>
import Countries from "@/api/country";
export default {
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      dataSetup: [],
      formModel: {
        country: null
      },
      valid: true
    };
  },
  async created() {
    const { setups } = await this.$axios.$get("/api/App/getsetup");
    this.dataSetup = setups;
  },
  mounted() {
    this.$validator.localize("ru", this.dictionary);
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(async isValid => {
        if (isValid) {
          const { rc } = await this.$axios.$put(
            "/api/App/updateSetup",
            this.dataSetup
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
        } else {
          this.$notify({
            title: "Внимание!",
            type: "error",
            message: "Заполните все поля правильно"
          });
        }
      });
    },
    clear() {
      this.formModel = {};
      this.$validator.reset();
    }
  }
};
</script>
