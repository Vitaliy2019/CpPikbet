 <template>
  <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialogForm">
    <v-card>
      <v-card-title>
        <span class="headline">Редактируем страну</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation width="100%">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <v-text-field readonly v-model="countrie.country_id" label="Id"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  required
                  :rules="nameRules"
                  v-model="countrie.country_name"
                  label="Наименование"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-checkbox v-model="countrie.Visible" label="Видимость"></v-checkbox>
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
  name: "form-edit-countries",
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || "Требуется наименование страны"]
    };
  },
  computed: {
    dialogForm: {
      get() {
        return this.$store.getters["countries/getDialogForm"];
      },
      set(newValue) {
        this.$store.commit("countries/SET_DIALOG_FORM", newValue);
      }
    },
    countrie: {
      get() {
        return this.$store.getters["countries/getCountrie"];
      },
      async set(newValue) {
        await this.$store.dispatch("countries/setCountrie", newValue);
      }
    },
    prOperation() {
      return this.$store.getters["countries/getPrOperation"];
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
      await this.$store.dispatch("countries/setCountrie", this.countrie);
      if (this.prOperation === "ok") {
        this.$store.dispatch("countries/setPrGetList", true);
        this.dialogForm = false;
        this.$notify({
          title: "Выполнено",
          type: "success",
          message: "Страна изменена"
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

 