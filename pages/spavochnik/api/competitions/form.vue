 <template>
  <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialogForm">
    <v-card>
      <v-card-title>
        <span class="headline">Редактируем соревнования</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation width="100%">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <v-text-field readonly v-model="competitions.country_id" label="Id"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  readonly
                  v-model="competitions.country_name"
                  label="Наименование страны"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field readonly v-model="competitions.league_id" label="Id"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  required
                  :rules="nameRules"
                  v-model="competitions.league_name"
                  label="Наименование соревнования"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="closeForm">Закрыть</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "form-edit-competitions",
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || "Требуется наименование соревнования"]
    };
  },
  computed: {
    dialogForm: {
      get() {
        return this.$store.getters["competitions/getDialogForm"];
      },
      set(newValue) {
        this.$store.commit("competitions/SET_DIALOG_FORM", newValue);
      }
    },
    competitions: {
      get() {
        return this.$store.getters["competitions/getCompetitions"];
      },
      async set(newValue) {
        await this.$store.dispatch("competitions/setCompetitions", newValue);
      }
    },
    prOperation() {
      return this.$store.getters["competitions/getPrOperation"];
    }
  },
  methods: {
    close() {
      this.imagecropperShow = false;
    },
    closeForm() {
      this.dialogForm = false;
    },
    save() {
      if (this.$refs.form.validate()) {
        this.insertItem();
      }
    },
    async insertItem() {
      await this.$store.dispatch(
        "competitions/setCompetitions",
        this.competitions
      );
      if (this.prOperation === "ok") {
        this.$store.dispatch("competitions/setPrGetList", true);
        this.dialogForm = false;
        this.$notify({
          title: "Выполнено",
          type: "success",
          message: "Соревнование изменено"
        });
      } else {
        this.$notify({
          title: "Ошибка!",
          type: "error",
          message: rc
        });
      }
    }
  }
};
</script>

 