 <template>
  <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialogForm">
    <v-card>
      <v-card-title>
        <span class="headline">Редактируем капера</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation width="100%">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <pan-thumb :image="kaper.Avatar" />

                <br />
                <v-speed-dial
                  v-model="fab"
                  :top="top"
                  :bottom="bottom"
                  :right="right"
                  :left="left"
                  :direction="direction"
                  :open-on-hover="hover"
                  :transition="transition"
                >
                  <template v-slot:activator>
                    <v-tooltip bottom>
                      <template v-slot:activator="{on}">
                        <v-btn v-on="on" v-model="fab" color="blue darken-2" dark fab>
                          <v-icon>present_to_all</v-icon>
                          <v-icon>close</v-icon>
                        </v-btn>
                      </template>
                      <span>Выберите аватар</span>
                    </v-tooltip>
                  </template>
                  <template v-for="(item, index) in selectAvatars">
                    <pan-thumb :image="item.Avatar" :key="index" @click="clickAvatar(item.Avatar)" />
                  </template>
                </v-speed-dial>
              </v-flex>
              <v-flex>
                <v-text-field required :rules="loginRules" v-model="kaper.Login" label="Логин"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field v-model="kaper.City" label="Город"></v-text-field>
              </v-flex>
              <v-flex>
                <v-select v-model="kaper.Pol" :items="items" label="Выберите пол"></v-select>
              </v-flex>
              <v-flex>
                <v-text-field v-model="kaper.Family" label="Фамилия"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field v-model="kaper.Fnme" label="Имя"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field v-model="kaper.Email" label="E-mail"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field v-model="kaper.Tel" label="Телефон"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field v-model="kaper.N_yandex_dengi" label="Яндекс.Деньги"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field required :rules="passwRules" v-model="kaper.Pasword" label="Пароль"></v-text-field>
              </v-flex>
              <v-flex>
                <label>Счет</label>
                <br />
                <el-input-number size="mini" v-model="kaper.Score" :min="1"></el-input-number>
              </v-flex>
              <v-flex>
                <label>Рейтинг</label>
                <br />
                <v-rating v-model="kaper.Rating" color="yellow accent-4" hover size="18"></v-rating>
              </v-flex>
              <v-flex>
                <label>Остаток</label>
                <br />
                <el-input-number size="mini" v-model="kaper.Count_stavok" :min="1"></el-input-number>
              </v-flex>
              <v-flex>
                <label>Доход</label>
                <br />
                <el-input-number size="mini" v-model="kaper.Dodhod" :min="1"></el-input-number>
              </v-flex>
              <v-flex>
                <label>Проход</label>
                <br />
                <el-input-number size="mini" v-model="kaper.Prohod" :min="1"></el-input-number>
              </v-flex>
              <v-flex>
                <label>Ср. коэфф</label>
                <br />
                <el-input-number size="mini" v-model="kaper.Sr_koeff" :min="1"></el-input-number>
              </v-flex>
              <v-flex>
                <label>ROI</label>
                <br />
                <el-input-number size="mini" v-model="kaper.Roi" :min="1"></el-input-number>
              </v-flex>
              <v-flex>
                <label>Выигрыш</label>
                <br />
                <el-input-number size="mini" v-model="kaper.Vyigreshey" :min="1"></el-input-number>
              </v-flex>
              <v-flex>
                <label>Возвраты</label>
                <br />
                <el-input-number size="mini" v-model="kaper.Vozvratov" :min="1"></el-input-number>
              </v-flex>
              <v-flex>
                <label>Проигрыш</label>
                <br />
                <el-input-number size="mini" v-model="kaper.Proigreshey" :min="1"></el-input-number>
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
import ImageCropper from "@/components/widgets/ImageCropper";
import PanThumb from "@/components/widgets/PanThumb1";
export default {
  name: "form-edit-kaper",
  components: { ImageCropper, PanThumb },
  data() {
    return {
      direction: "bottom",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",

      items: ["мужской", "женский"],
      imagecropperShow: false,
      imagecropperKey: 0,
      //image: "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191",

      valid: true,
      loginRules: [v => !!v || "Требуется логин капера"],
      passwRules: [v => !!v || "Требуется пароль капера"],
      imgDefault: "https://randomuser.me/api/portraits/men/1.jpg",

      selectAvatars: []
    };
  },
  computed: {
    image: {
      get() {
        return this.$store.getters["kaper/getImageData"];
      },
      set(newValue) {
        this.$store.dispatch("kaper/setImageData", newValue);
      }
    },
    dialogForm: {
      get() {
        return this.$store.getters["kaper/getDialogForm"];
      },
      set(newValue) {
        this.$store.commit("kaper/SET_DIALOG_FORM", newValue);
      }
    },
    kaper: {
      get() {
        return this.$store.getters["kaper/getKaper"];
      },
      async set(newValue) {
        await this.$store.dispatch("kaper/setKapper", newValue);
      }
    },
    prOperation() {
      return this.$store.getters["kaper/getPrOperation"];
    }
  },
  async created() {
    const { avatars } = await this.$axios.$get("/api/Avatars");
    debugger;
    this.selectAvatars = avatars;
  },
  methods: {
    clickAvatar(avatar) {
      debugger;
      alert("gggg");
      this.kaper.Avatar = avatar;
    },
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.kaper.Avatar = resData.files.avatar;
    },
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
      await this.$store.dispatch("kaper/setKapper", this.kaper);
      if (this.prOperation === "ok") {
        this.$store.dispatch("kaper/setPrGetList", true);
        this.dialogForm = false;
        this.$notify({
          title: "Выполнено",
          type: "success",
          message: "Капер изменен"
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
<style scoped>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
 