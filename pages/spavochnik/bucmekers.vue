<template>
  <v-container>
    <div class="my-2">
      <el-tooltip effect="dark" content="Введите значение для поиска и фильтраци">
        <el-input
          v-model="listQuery.Tile"
          prefix-icon="el-icon-search"
          clearable
          style="width: 200px;"
          class="filter-item"
          placeholder="Введите значение"
          @keyup.enter.native="handleFilter"
        />
      </el-tooltip>

      <el-tooltip effect="dark" content="Поиск">
        <v-btn icon dark medium color="primary" @click="handleFilter">
          <v-icon>search</v-icon>
        </v-btn>
      </el-tooltip>
    </div>
    <div class="mb-2">
      <el-tooltip effect="dark" content="Добавить нового букмекера">
        <v-btn icon dark medium color="primary" @click="handleInsertItem">
          <v-icon>add</v-icon>
        </v-btn>
      </el-tooltip>
      <el-tooltip effect="dark" content="Копировать букмекера">
        <v-btn color="primary" icon dark @click="handleCopy">
          <v-icon>filter_none</v-icon>
        </v-btn>
      </el-tooltip>
      <el-tooltip effect="dark" content="Обновить">
        <v-btn icon dark color="primary" @click="getList">
          <v-icon>autorenew</v-icon>
        </v-btn>
      </el-tooltip>
      <el-tooltip effect="dark" content="Удалить выделенного букмекра">
        <v-btn icon dark color="primary" @click="handleDeleteAll">
          <v-icon>delete</v-icon>
        </v-btn>
      </el-tooltip>
      <el-tooltip effect="dark" content="Показать / скрыть поля">
        <v-btn icon dark color="primary" @click="handleSetupFields">
          <v-icon>settings</v-icon>
        </v-btn>
      </el-tooltip>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="desserts"
      style="width: 100%"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <template v-for="(fruit, index) in LangFormThead">
        <el-table-column
          v-if="fruit.chkbD"
          :key="index"
          sortable
          :label="fruit.lngName"
          :property="fruit.nameField"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row[fruit.nameField] }}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="Действие">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Редактировать букмекера">
            <v-btn outline icon dark medium color="primary" @click="editItem(scope.row)">
              <v-icon small>edit</v-icon>
            </v-btn>
          </el-tooltip>
          <el-tooltip effect="dark" content="Удалить букмекера">
            <v-btn outline icon dark medium color="pink" @click="deleteItem(scope.row)">
              <v-icon small>delete</v-icon>
            </v-btn>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.Page"
        :page-sizes="[5,10,20,30,50,100,200]"
        :page-size="listQuery.Limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDesserts"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <set-fieldslang-ref title="Показать / скрыть поля"/>
    <v-dialog v-model="dialogForm" max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Редактируем букмекера</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation width="100%">
            <v-container>
              <v-layout wrap>
                <v-flex>
                  <v-text-field
                    required
                    :rules="nameRules"
                    v-model="bucmekers.Name"
                    label="Наименование"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-rating
                    v-model="bucmekers.Rating"
                    background-color="white"
                    color="yellow accent-4"
                    dense
                    half-increments
                    hover
                    size="18"
                  ></v-rating>
                </v-flex>
                <v-flex>
                  <v-text-field
                    required
                    :rules="descRules"
                    v-model="bucmekers.Description"
                    label="Описание"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Закрыть</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SetFieldslangRef from "@/components/setFieldslangRef/index.vue";
export default {
  layout: "dashboard",
  components: { SetFieldslangRef },
  data() {
    return {
      valid: true,
      listLoading: false,
      nameRules: [v => !!v || "Требуется имя букмекера"],
      descRules: [v => !!v || "Требуется описание букмекера"],
      dialogForm: false,
      bucmekers: {
        Id: 0,
        Name: "",
        Rating: 1,
        Description: "Букмекерская контора"
      },
      search: "",
      selected: [],
      loading: false,
      headers: [
        {
          text: "ID",
          align: "center",
          // sortable: true,
          value: "Id"
        },
        { text: "Наименование", value: "Name" },
        { text: "Рейтинг", value: "rating" },
        { text: "Описание", value: "description" }
      ],
      pagination: {},
      totalDesserts: 0,
      desserts: [],
      listQuery: {
        Page: 1,
        Limit: 20,
        Tile: ""
      },
      formThead: [
        { nameField: "Id", lngName: "№", chkbD: true },
        { nameField: "Name", lngName: "Наименование", chkbD: true },
        { nameField: "Rating", lngName: "Рейтинг", chkbD: true },
        { nameField: "Description", lngName: "Описание", chkbD: true }
      ],
      multipleSelection: []
    };
  },
  computed: {
    LangFormThead: function() {
      return this.$store.state.formThead;
    }
  },
  created() {
    this.$store.commit("SET_FORMTHEAD", this.formThead);
    this.getList();
  },
  methods: {
    handleInsertItem() {
      this.reset();
      this.dialogForm = true;
    },
    reset() {
      this.bucmekers.Id = 0;
      this.bucmekers.Name = "";
      this.bucmekers.Rating = 1;
      this.bucmekers.Description = "Букмекерская контора";
    },
    handleDeleteAll() {
      this.$confirm(
        "Вы подтверждаете удаление выделенных записей",
        "Внимание!",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Отмена",
          type: "warning",
          center: true
        }
      ).then(async () => {
        if (this.multipleSelection.length > 0) {
          const { rc } = await this.$axios.$post(
            "/api/Bucmekers/deleteall",
            this.multipleSelection
          );
          if (rc === "ok") {
            this.getList();
            this.$message({
              type: "success",
              message: "Выделенные записи успешно удалены!"
            });
          } else {
            this.$message({
              type: "error",
              message: rc
            });
          }
        }
      });
    },
    handleCopy() {
      this.$confirm("Вы подтверждаете копирование", "Внимание!", {
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        type: "warning",
        center: true
      }).then(async () => {
        // var e = this
        // let data = new FormData();
        if (this.multipleSelection.length > 0) {
          const { rc } = await this.$axios.$post(
            "/api/Bucmekers/copy",
            this.multipleSelection
          );
          if (rc === "ok") {
            this.getList();
            this.$message({
              type: "success",
              message: "Выбранные букмекеры скопированы!"
            });
          } else {
            this.$message({
              type: "error",
              message: rc
            });
          }
        }
      });
    },
    handleSetupFields() {
      this.$store.commit("SET_DIALOGVISIBLE", true);
    },
    handleFilter() {
      this.listQuery.Page = 1;
      /*if (
        this.listQuery.Title ===
        "" &&
        this.listQuery.Value4 === "2" &&
        this.listQuery.ValueS !== ""
      ) {
        this.listQuery.valueP = "";
      }*/
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.listQuery.Limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.Page = val;
      this.getList();
    },
    async getList() {
      this.listLoading = true;
      const { bucmekers, total } = await this.$axios.$get("/api/Bucmekers", {
        params: this.listQuery
      });
      this.desserts = bucmekers;
      this.totalDesserts = total;
      this.listLoading = false;
    },
    close() {
      this.dialogForm = false;
    },
    save() {
      if (this.$refs.form.validate()) {
        this.insertItem();
      }
    },
    async insertItem() {
      const { rc } = await this.$axios.$post("/api/Bucmekers", this.bucmekers);
      if (rc === "ok") {
        this.getList();
        this.dialogForm = false;
        this.$notify({
          title: "Выполнено",
          type: "success",
          message: "Букмекер изменен"
        });
      } else {
        this.$notify({
          title: "Ошибка!",
          type: "error",
          message: rc
        });
      }
    },
    editItem(item) {
      this.bucmekers = Object.assign({}, item);
      this.dialogForm = true;
    },

    deleteItem(item) {
      this.$confirm("Вы подтверждаете удаление?", "Внимание", {
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        type: "warning",
        center: true
      })
        .then(async () => {
          ;
          // this.bucmekers = Object.assign({}, item);
          const { rc } = await this.$axios.$delete("/api/Bucmekers", {
            params: item
          });
          if (rc === "ok") {
            await this.getList();
            this.$notify({
              title: "Выполнено!", // this.$t("message.titleSucces"),
              message: "Букмекер успешно удален", // this.$t("message.succes"),
              type: "success"
            });
          } else {
            this.$notify({
              title: "Ошибка",
              message: rc,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            type: "info",
            message: "Удаленеие счета отменено"
          });
        });
    }
  }
};
</script>