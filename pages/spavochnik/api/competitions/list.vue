<template>
  <v-container>
    <div class="my-2">
      <el-tooltip effect="dark" content="Введите значение для поиска и фильтраци">
        <el-select
          clearable
          @change="handleFilter"
          v-model="listQuery.Tile"
          placeholder="Выберите страну"
        >
          <el-option
            v-for="item in selected"
            :key="item.country_id"
            :label="item.country_name"
            :value="item.country_name"
            @keyup.enter.native="handleFilter"
          ></el-option>
        </el-select>
      </el-tooltip>
      <el-tooltip effect="dark" content="Введите значение для поиска и фильтраци">
        <el-input
          v-model="listQuery.ValueC"
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
      <el-tooltip effect="dark" content="Загрузить из API">
        <v-btn icon dark color="primary" @click="loadDataApi">
          <v-icon>cloud_download</v-icon>
        </v-btn>
      </el-tooltip>

      <el-tooltip effect="dark" content="Обновить">
        <v-btn icon dark color="primary" @click="getList">
          <v-icon>autorenew</v-icon>
        </v-btn>
      </el-tooltip>
      <el-tooltip effect="dark" content="Удалить выделенные соревнования">
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
      <el-table-column type="selection" width="55" />
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
          <el-tooltip effect="dark" content="Редактировать соревнования">
            <v-btn outline icon dark medium color="primary" @click="editItem(scope.row)">
              <v-icon small>edit</v-icon>
            </v-btn>
          </el-tooltip>
          <el-tooltip effect="dark" content="Удалить соревнования">
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
    <set-fieldslang-ref title="Показать / скрыть поля" />
    <form-edit></form-edit>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Данные загружаются, подождите пожалуйста
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      dialogDate: false,
      dialog: false,
      search: "",
      selected: [],
      totalDesserts: 0,
      desserts: [],
      listQuery: {
        Page: 1,
        Limit: 20,
        Tile: "",
        ValueC: ""
      },
      formThead: [
        { nameField: "country_id", lngName: "Id", chkbD: true },
        { nameField: "country_name", lngName: "Наименование", chkbD: true },
        { nameField: "league_id", lngName: "Id соревнования", chkbD: true },
        {
          nameField: "league_name",
          lngName: "Наименование соревнования",
          chkbD: true
        }
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
        if (this.$store.getters["competitions/getPrGetList"]) {
          this.getList();
        }
        return this.$store.getters["competitions/getPrGetList"];
      },
      set(newValue) {
        this.$store.dispatch("competitions/setPrGetList", newValue);
      }
    }
  },
  async created() {
    const { countries } = await this.$axios.$get("/api/Countries/getListAll");
    this.selected = countries;
    this.$store.commit("SET_FORMTHEAD", this.formThead);
    this.getList();
  },
  methods: {
    async loadDataApi() {
      this.$confirm(
        "Перед загрузкой данных ранее загруженные данные будут удалены из базы данных. Подтверждаете удаление?",
        "Внимание!",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Отмена",
          type: "warning",
          center: true
        }
      ).then(async () => {
        this.dialog = true;
        const { rc } = await this.$axios.$get(
          "/api/Api/loadDataApiCompetitions"
        );
        if (rc === "ok") {
          this.getList();
          this.dialog = false;

          this.$notify({
            title: "Выполнено!",
            type: "success",
            message: "Данные загружены"
          });
        }else{
          this.dialog = false;
          this.$notify({
            title: "Ошибка!",
            type: "error",
            message: rc
          })
        }
      });
    },
    handleInsertItem() {
      this.$store.commit("competitions/RESET");
      this.$store.commit("competitions/SET_DIALOG_FORM", true);
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
            "/api/Competitions/deleteAll",
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

    handleSetupFields() {
      this.$store.commit("SET_DIALOGVISIBLE", true);
    },
    handleFilter() {
      this.listQuery.Page = 1;
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
      const { competitions, total } = await this.$axios.$get(
        "/api/Competitions",
        {
          params: this.listQuery
        }
      );
      this.desserts = competitions;
      this.totalDesserts = total;
      this.prGetList = false;
    },

    editItem(item) {
      this.$store.commit(
        "competitions/SET_COMPETITIONS",
        Object.assign({}, item)
      );
      this.$store.commit("competitions/SET_DIALOG_FORM", true);
    },
    deleteItem(item) {
      this.$confirm("Вы подтверждаете удаление?", "Внимание", {
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        type: "warning",
        center: true
      })
        .then(async () => {
          
          const { rc } = await this.$axios.$delete("/api/Competitions", {
            params: item
          }); //, {
          if (rc === "ok") {
            await this.getList();
            this.$notify({
              title: "Выполнено!",
              message: "Страна успешно удалена",
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
            message: "Удаленеие страны отменено"
          });
        });
    }
  }
};
</script>