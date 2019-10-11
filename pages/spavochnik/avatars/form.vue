 <template>
  <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialogForm">
    <v-card>
      <v-card-title>
        <span class="headline">Редактируем аватар</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation width="100%">
          <v-container>
            <v-layout wrap>
              <v-flex>
                <pan-thumb :image="avatars.Avatar" />
                <br />
                <v-btn color="primary" @click="imagecropperShow=true">
                  <v-icon>cloud_upload</v-icon>Обновить
                </v-btn>
                <image-cropper
                  v-show="imagecropperShow"
                  :width="300"
                  :height="300"
                  :key="imagecropperKey"
                  url="https://httpbin.org/post"
                  lang-type="en"
                  @close="close"
                  @crop-upload-success="cropSuccess"
                />
              </v-flex>
              <v-flex xs10>
                <v-text-field required v-model="avatars.Desc" label="Описание"></v-text-field>
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
import PanThumb from "@/components/widgets/PanThumb";
export default {
  name: "form-edit-avatar",
  components: { ImageCropper, PanThumb },
  data() {
    return {
      // items: ["мужской", "женский"],
      imagecropperShow: false,
      imagecropperKey: 0,
      //image: "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191",

      valid: true,
      // loginRules: [v => !!v || "Требуется логин капера"],
      // passwRules: [v => !!v || "Требуется пароль капера"],
      imgDefault: "https://randomuser.me/api/portraits/men/1.jpg"
    };
  },
  computed: {
    image: {
      get() {
        return this.$store.getters["avatars/getImageData"];
      },
      set(newValue) {
        this.$store.dispatch("avatars/setImageData", newValue);
      }
    },
    dialogForm: {
      get() {
        return this.$store.getters["avatars/getDialogForm"];
      },
      set(newValue) {
        this.$store.commit("avatars/SET_DIALOG_FORM", newValue);
      }
    },
    avatars: {
      get() {
        return this.$store.getters["avatars/getAvatar"];
      },
      async set(newValue) {
        await this.$store.dispatch("avatars/setAvatar", newValue);
      }
    },
    prOperation() {
      return this.$store.getters["avatars/getPrOperation"];
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.avatars.Avatar = resData.files.avatar;
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
      debugger;
      await this.$store.dispatch("avatars/setAvatar", this.avatars);
      if (this.prOperation === "ok") {
        this.$store.dispatch("avatars/setPrGetList", true);
        this.dialogForm = false;
        this.$notify({
          title: "Выполнено",
          type: "success",
          message: "Аватар изменен"
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

 