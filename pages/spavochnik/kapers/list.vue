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
      <el-tooltip effect="dark" content="Добавить нового капера">
        <v-btn icon dark medium color="primary" @click="handleInsertItem">
          <v-icon>add</v-icon>
        </v-btn>
      </el-tooltip>
      <el-tooltip effect="dark" content="Копировать капера">
        <v-btn color="primary" icon dark @click="handleCopy">
          <v-icon>filter_none</v-icon>
        </v-btn>
      </el-tooltip>
      <el-tooltip effect="dark" content="Обновить">
        <v-btn icon dark color="primary" @click="getList">
          <v-icon>autorenew</v-icon>
        </v-btn>
      </el-tooltip>
      <el-tooltip effect="dark" content="Удалить выделенного капера">
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
      v-loading="prGetList"
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
            <v-avatar v-if="fruit.nameField==='Avatar'">
              <img :src="scope.row[fruit.nameField]" alt="avatar">
            </v-avatar>
            <span v-else style="margin-left: 10px">{{ scope.row[fruit.nameField] }}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="Действие">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Редактировать капера">
            <v-btn outline icon dark medium color="primary" @click="editItem(scope.row)">
              <v-icon small>edit</v-icon>
            </v-btn>
          </el-tooltip>
          <el-tooltip effect="dark" content="Удалить капера">
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
    <form-edit></form-edit>
  </v-container>
</template>

<script>
import SetFieldslangRef from "@/components/setFieldslangRef/index.vue";
import FormEdit from "./form.vue";
export default {
  layout: "dashboard",
  components: { SetFieldslangRef, FormEdit },
  data() {
    return {
      // listLoading: false,
      search: "",
      selected: [],
      totalDesserts: 0,
      desserts: [],
      listQuery: {
        Page: 1,
        Limit: 20,
        Tile: ""
      },
      formThead: [
        { nameField: "Id", lngName: "№", chkbD: true },
        { nameField: "Login", lngName: "Логин", chkbD: true },
        { nameField: "Avatar", lngName: "Аватар", chkbD: false },
        { nameField: "City", lngName: "Город", chkbD: false },
        { nameField: "Pol", lngName: "Пол", chkbD: false },
        { nameField: "Family", lngName: "Фамилия", chkbD: true },
        { nameField: "Fnme", lngName: "Имя", chkbD: true },
        { nameField: "Email", lngName: "E-mail", chkbD: true },
        { nameField: "Tel", lngName: "Телефон", chkbD: true },
        { nameField: "N_yandex_dengi", lngName: "Яндекс.Деньги", chkbD: false },
        { nameField: "Pasword", lngName: "Пароль", chkbD: false },
        { nameField: "Score", lngName: "Счет", chkbD: false },
        { nameField: "Rating", lngName: "Рейтинг", chkbD: true },
        { nameField: "Count_stavok", lngName: "Ставки", chkbD: false },
        { nameField: "Dodhod", lngName: "Доход", chkbD: false },
        { nameField: "Prohod", lngName: "Проход", chkbD: false },
        { nameField: "Sr_koeff", lngName: "Ср.коэфф.", chkbD: false }
      ],

      multipleSelection: []
    };
  },
  computed: {
    LangFormThead: function() {
      return this.$store.state.formThead;
    },
    prGetList: {
      get() {
        if (this.$store.getters["kaper/getPrGetList"]) {
          this.getList();
        }
        return this.$store.getters["kaper/getPrGetList"];
      },
      set(newValue) {
        this.$store.dispatch("kaper/setPrGetList", newValue);
      }
    }
  },
  created() {
    this.$store.commit("SET_FORMTHEAD", this.formThead);
    this.getList();
  },
  methods: {
    handleInsertItem() {
      this.$store.commit("kaper/RESET");
      this.$store.commit("kaper/SET_DIALOG_FORM", true);
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
            "/api/Kapers/deleteall",
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
            "/api/Kapers/copy",
            this.multipleSelection
          );
          if (rc === "ok") {
            this.getList();
            this.$message({
              type: "success",
              message: "Выбранные каперы скопированы!"
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
      this.prGetList = true;
      const { kapers, total } = await this.$axios.$get("/api/Kapers", {
        params: this.listQuery
      });
      this.desserts = kapers;
      this.totalDesserts = total;
      this.prGetList = false;
    },

    editItem(item) {
      this.$store.commit("kaper/SET_KAPER", Object.assign({}, item));
      this.$store.commit("kaper/SET_DIALOG_FORM", true);
    },
    deleteItem(item) {
      this.$confirm("Вы подтверждаете удаление?", "Внимание", {
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        type: "warning",
        center: true
      })
        .then(async () => {
          //this.kapers = Object.assign({}, item);
          debugger;
          const { rc } = await this.$axios.$delete(`/api/Kapers/${item.Id}`); //, {
          //params: item
          //});
          if (rc === "ok") {
            await this.getList();
            this.$notify({
              title: "Выполнено!", // this.$t("message.titleSucces"),
              message: "Капер успешно удален", // this.$t("message.succes"),
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
            message: "Удаленеие капера отменено"
          });
        });
    }
  }
};
</script>