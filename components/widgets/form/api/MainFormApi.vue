<template>
  <v-form v-model="valid">
    <v-subheader class="pa-0 mt-3">Здесь вы можете загрузть данные из API</v-subheader>
    <v-btn @click="loadData" class="primary">Загрузить данные в базу из API</v-btn>
    <v-progress-linear :indeterminate="indeterminate"></v-progress-linear>
    <v-select
      v-model="country"
      :items="ApiCountries"
      @change="changeCounty"
      item-value="country_id"
      item-text="country_name"
      label="Выберите страну"
      outline
    ></v-select>
    <v-select
      v-model="competition"
      @change="changeCompetition"
      :items="competitions"
      item-value="league_id"
      item-text="league_name"
      label="Выберите лигу"
      outline
    ></v-select>
    <v-select
      v-model="team"
      :items="teams"
      item-value="team_key"
      item-text="team_name"
      label="Выберите команду"
      outline
    ></v-select>

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
      indeterminate: false,
      country: 0,
      competitions: [],
      competition: 0,
      teams: [],
      team: "",
      valid: true
    };
  },
  computed: {
    ApiCountries() {
      return this.$store.getters.getApiCountries;
    }
  },
  async created() {
    //const { setups } = await this.$axios.$get("/api/App/getsetup");
    //this.dataSetup = setups;
  },
  mounted() {
    this.$validator.localize("ru", this.dictionary);
  },
  methods: {
    async loadData() {
      this.indeterminate = true;
      const { rc } = await this.$axios.$get("/api/Api/loadDataApi");
      
    },
    async changeCompetition() {
      this.teams = await this.$axios.$get(
        `/api/Api/getTeams?lid=${this.competition}`
      );
      console.log(this.teams);
    },
    async changeCounty() {
      this.competitions = await this.$axios.$get(
        `/api/Api/getСompetitions?cid=${this.country}`
      );
    },
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
      //this.formModel = {};
      this.$validator.reset();
    }
  }
};
</script>
