 <template>
  <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialogForm">
    <v-card>
      <v-card-title>
        <span class="headline">Редактируем Событие</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation width="100%">
          <v-item-group>
            <v-container>
              <v-layout wrap>
                <v-flex>
                  <v-text-field readonly v-model="events.match_id" label="Id"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field readonly v-model="events.country_id" label="Id"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field readonly v-model="events.country_name" label="Наименование страны"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field readonly v-model="events.league_id" label="Id"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    required
                    :rules="nameRules"
                    v-model="events.league_name"
                    label="Наименование соревнования"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-item-group>
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
  name: "form-edit-events",
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || "Требуется наименование соревнования"]
    };
  },
  computed: {
    dialogForm: {
      get() {
        return this.$store.getters["events/getDialogForm"];
      },
      set(newValue) {
        this.$store.commit("events/SET_DIALOG_FORM", newValue);
      }
    },
    events: {
      get() {
        return this.$store.getters["events/getEvents"];
      },
      async set(newValue) {
        await this.$store.dispatch("events/setEvents", newValue);
      }
    },
    prOperation() {
      return this.$store.getters["events/getPrOperation"];
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
      await this.$store.dispatch("events/setCompetitions", this.events);
      if (this.prOperation === "ok") {
        this.$store.dispatch("events/setPrGetList", true);
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

 