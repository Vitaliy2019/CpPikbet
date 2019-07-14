 <template>
  <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialogForm">
    <v-card>
      <v-card-title>
        <span class="headline">Редактируем Событие</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation width="100%">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Страна</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field readonly v-model="events.match_id" label="Id матча"></v-text-field>
                    <v-text-field readonly v-model="events.country_id" label="Id страны"></v-text-field>
                    <v-text-field
                      readonly
                      v-model="events.country_name"
                      label="Наименование страны"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Матч</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field readonly v-model="events.match_date" label="Дата матча"></v-text-field>
                    <v-text-field readonly v-model="events.match_status" label="Статус матча"></v-text-field>
                    <v-text-field readonly v-model="events.match_time" label="Время матча"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Соревнование</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field readonly v-model="events.league_id" label="Id соревнования"></v-text-field>
                    <v-text-field
                      required
                      :rules="nameRules"
                      v-model="events.league_name"
                      label="Наименование соревнования"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Команда хозяйка</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field readonly v-model="events.match_hometeam_id" label="Id команды"></v-text-field>
                    <v-text-field readonly v-model="events.match_hometeam_name" label="Имя команды"></v-text-field>
                    <v-text-field readonly v-model="events.match_hometeam_score" label="Счет"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Команда гость</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field readonly v-model="events.match_awayteam_id" label="Id команды"></v-text-field>
                    <v-text-field readonly v-model="events.match_awayteam_name" label="Имя команды"></v-text-field>
                    <v-text-field
                      readonly
                      v-model="events.match_awayteam_score"
                      label="Счет команды"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Голы до перерыва</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field
                      readonly
                      v-model="events.match_hometeam_halftime_score"
                      label="Команда хозяйка"
                    ></v-text-field>
                    <v-text-field
                      readonly
                      v-model="events.match_awayteam_halftime_score"
                      label="Команда гостья"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Голы после перерыва</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field
                      readonly
                      v-model="events.match_hometeam_extra_score"
                      label="Команда хозяйка"
                    ></v-text-field>
                    <v-text-field
                      readonly
                      v-model="events.match_awayteam_extra_score"
                      label="Команда гостья"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Голы по пенальти</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field
                      readonly
                      v-model="events.match_hometeam_penalty_score"
                      label="Команда хозяйка"
                    ></v-text-field>
                    <v-text-field
                      readonly
                      v-model="events.match_awayteam_penalty_score"
                      label="Команда гостья"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Система игры</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field
                      readonly
                      v-model="events.match_hometeam_system"
                      label="Команда хозяйка"
                    ></v-text-field>
                    <v-text-field
                      readonly
                      v-model="events.match_awayteam_system"
                      label="Команда гостья"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
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
      await this.$store.dispatch("events/setEvents", this.events);
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

 