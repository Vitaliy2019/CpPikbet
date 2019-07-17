 <template>
  <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialogForm">
    <v-card>
      <v-card-title>
        <span class="headline">Редактируем Коэфициенты</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation width="100%">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Инфа</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field readonly v-model="odds.Match_id" label="Id матча"></v-text-field>
                    <v-text-field readonly v-model="odds.Odd_bookmakers" label="Букмекер"></v-text-field>
                    <v-text-field readonly v-model="odds.Odd_date" label="Дата"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Коэффициент</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Odd_1" label="Победа 1 ком."></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Odd_x" label="Ничья"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Odd_2" label="Победа 2 ком."></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Коэффициент</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Odd_1x" label="Odd_1x"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Odd_12" label="Odd_12"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Odd_x2" label="Odd_x2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_4_5_1" label="ah-4.5_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_4_5_2" label="ah-4.5_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_4_1" label="ah-4_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_4_2" label="ah-4_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_3_5_1" label="ah-3.5_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_3_5_2" label="ah-3.5_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_3_1" label="ah-3.5_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_3_5_2" label="ah-3.5_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_3_1" label="ah-3_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_3_2" label="ah-3_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_2_5_1" label="ah-2.5_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_2_5_2" label="ah-2.5_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_2_1" label="ah-2_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_2_2" label="ah-2_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_1_5_1" label="ah-1.5_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_1_5_2" label="ah-1.5_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_1_1" label="ah-1_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_1_2" label="ah-1_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p4_5_1" label="ah+4.5_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p4_5_2" label="ah+4.5_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p4_1" label="ah+4_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p4_2" label="ah+4_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p3_5_1" label="ah+3.5_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p3_5_2" label="ah+3.5_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p3_1" label="ah+3_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p3_1" label="ah+3_1"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p2_5_1" label="ah+2.5_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p2_5_2" label="ah+2.5_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p2_1" label="ah+2_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p2_2" label="ah+2_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p1_5_1" label="ah+1.5_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p1_5_2" label="ah+1.5_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p1_1" label="ah+1_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah_p1_2" label="ah+1_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Asian Hadndikap</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah0_1" label="ah0_1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Ah0_1" label="ah0_2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.O_0_5" label="o+0.5"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.U_0_5" label="u+0.5"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.O_1" label="o+1"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.U_1" label="u+1"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.O_1_5" label="o+1.5"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.U_1_5" label="u+1.5"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.O_2" label="o+2"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.U_2" label="u+2"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.O_2_5" label="o+2.5"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.U_2_5" label="u+2.5"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.O_3" label="o+3"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.U_3" label="u+3"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.O_3_5" label="o+3.5"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.U_3_5" label="u+3.5"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.O_4_5" label="o+4.5"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.U_4_5" label="u+4.5"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.O_5_5" label="o+5.5"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.U_5_5" label="u+5.5"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="white--text">Over/under</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <v-text-field mask="#.##" readonly v-model="odds.Bts_yes" label="Bts_yes"></v-text-field>
                    <v-text-field mask="#.##" readonly v-model="odds.Bts_no" label="Bts_no"></v-text-field>
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
  name: "form-edit-odds",
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || "Требуется наименование соревнования"]
    };
  },
  computed: {
    dialogForm: {
      get() {
        return this.$store.getters["odds/getDialogForm"];
      },
      set(newValue) {
        this.$store.commit("odds/SET_DIALOG_FORM", newValue);
      }
    },
    odds: {
      get() {
        return this.$store.getters["odds/getOdds"];
      },
      async set(newValue) {
        await this.$store.dispatch("odds/setOdds", newValue);
      }
    },
    prOperation() {
      return this.$store.getters["odds/getPrOperation"];
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
      await this.$store.dispatch("odds/setOdds", this.odds);
      if (this.prOperation === "ok") {
        this.$store.dispatch("odds/setPrGetList", true);
        this.dialogForm = false;
        this.$notify({
          title: "Выполнено",
          type: "success",
          message: "Коэффициент изменен"
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

 