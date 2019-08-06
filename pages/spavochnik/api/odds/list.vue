<template>
  <v-container>
    <div class="my-2">
      <el-tooltip effect="dark" content="Введите значение для поиска и фильтраци">
        <el-select
          clearable
          @change="handleFilter"
          v-model="listQuery.Tile"
          placeholder="Выберите букмекера"
        >
          <el-option
            v-for="(item, index) in selectedBukmekers"
            :key="'selBuk'+index"
            :label="item"
            :value="item"
            @keyup.enter.native="handleFilter"
          ></el-option>
        </el-select>
      </el-tooltip>
      <el-tooltip effect="dark" content="Введите значение для поиска и фильтраци">
        <el-select
          clearable
          @change="handleFilter"
          v-model="listQuery.ValueM"
          placeholder="Выберите событие"
        >
          <el-option
            v-for="(item, index) in selected"
            :key="index"
            :label="`${item.match_hometeam_name} - ${item.match_awayteam_name}`"
            :value="item.match_id"
            @keyup.enter.native="handleFilter"
          ></el-option>
        </el-select>
      </el-tooltip>
      <el-tooltip v-if="false" effect="dark" content="Введите значение для поиска и фильтраци">
        <el-date-picker
          v-model="listQuery.ValueC"
          @keyup.enter.native="handleFilter"
          type="date"
          placeholder="Выбераит дату"
        ></el-date-picker>
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
          :key="'data-'+index"
          sortable
          :label="fruit.lngName"
          :property="fruit.nameField"
        >
          <template slot-scope="scope">
            <vueDateFormat
              v-if="fruit.nameField==='odd_date'"
              :format="formatDate.format"
              :time="scope.row[fruit.nameField]"
              :type="formatDate.type"
              :auto-update="formatDate.autoUpdate"
            />
            <span
              v-else-if="fruit.nameField==='match_id' || fruit.nameField==='odd_bookmakers'"
              style="margin-left: 10px"
            >{{ scope.row[fruit.nameField] }}</span>
            <span v-else style="margin-left: 10px">{{ scope.row[fruit.nameField] }}</span>
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
    <v-dialog v-model="dialogDate" hide-overlay persistent width="500">
      <v-card color="primary" dark>
        <v-card-text>
          Выберите период загрузки (не более 3 дней)
          <el-form :model="rulesForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="value1">
              <el-date-picker
                v-model="rulesForm.value1"
                type="daterange"
                range-separator="до"
                start-placeholder="Начальная дата"
                end-placeholder="Конечная дата"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              {{rulesForm.Fvalue1}}
            </el-form-item>
            <el-form-item>
              <v-btn outline @click="loadData('ruleForm')" color="white">Загрузить данные</v-btn>
            </el-form-item>
          </el-form>
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
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      formatDate: {
        format: "dd.MM.yyyy",
        time: new Date(), // Время или строка(eg:'2017-12-12'),
        type: "fmt",
        autoUpdate: false
      },
      rulesForm: {
        value1: ""
      },
      dialog: false,
      dialogDate: false,
      search: "",
      selectedBukmekers: [],
      selected: [],
      totalDesserts: 0,
      desserts: [],
      listQuery: {
        Page: 1,
        Limit: 20,
        Tile: "",
        ValueC: null,
        ValueM: null
      },
      formThead: [
        { nameField: "match_id", lngName: "Id матча", chkbD: true },
        { nameField: "odd_bookmakers", lngName: "Букмекер", chkbD: false },
        { nameField: "odd_date", lngName: "Дата", chkbD: true },
        { nameField: "odd_1", lngName: "odd 1", chkbD: false },
        {
          nameField: "odd_x",
          lngName: "odd x",
          chkbD: true
        },
        { nameField: "odd_2", lngName: "odd 2", chkbD: true },
        { nameField: "odd_1x", lngName: "odd 1x", chkbD: true },
        { nameField: "odd_12", lngName: "odd 12", chkbD: true },
        {
          nameField: "odd_x2",
          lngName: "odd x2",
          chkbD: true
        },
        {
          nameField: "ah-4.5.1",
          lngName: "ah-4.5.1",
          chkbD: false
        },
        {
          nameField: "ah-4.5.2",
          lngName: "ah-4.5.1",
          chkbD: false
        },
        {
          nameField: "ah-4.1",
          lngName: "ah-4.1",
          chkbD: true
        },
        {
          nameField: "ah-4.2",
          lngName: "ah-4.2",
          chkbD: false
        },
        {
          nameField: "ah-3.5.1",
          lngName: "ah-3.5.1",
          chkbD: false
        },
        {
          nameField: "ah-3.5.2",
          lngName: "ah-3.5.2",
          chkbD: false
        },
        {
          nameField: "ah-3.1",
          lngName: "ah-3.1",
          chkbD: false
        },
        {
          nameField: "ah-3.2",
          lngName: "ah-3.2",
          chkbD: false
        },
        {
          nameField: "ah-2.5.1",
          lngName: "ah-2.5.1",
          chkbD: false
        },
        {
          nameField: "ah-2.5.2",
          lngName: "ah-2.5.2",
          chkbD: false
        },
        {
          nameField: "ah-2.1",
          lngName: "ah-2.1",
          chkbD: false
        },
        {
          nameField: "ah-2.2",
          lngName: "ah-2.2",
          chkbD: false
        },
        {
          nameField: "ah-1.5.1",
          lngName: "ah-1.5.1",
          chkbD: false
        },
        { nameField: "ah-1.5.2", lngName: "ah-1.5.1", chkbD: false },
        { nameField: "ah-1.1", lngName: "ah-1.1", chkbD: false },
        { nameField: "ah-1.2", lngName: "ah-1.2", chkbD: false },

        { nameField: "ah+4.5.1", lngName: "ah+4.5.1", chkbD: false },
        { nameField: "ah+4.5.2", lngName: "ah+4.5.2", chkbD: false },
        { nameField: "ah+4.1", lngName: "ah+4.1", chkbD: false },
        { nameField: "ah+4.2", lngName: "ah+4.2", chkbD: false },
        { nameField: "ah+3.1", lngName: "ah+3.1", chkbD: false },
        { nameField: "ah+3.2", lngName: "ah+3.2", chkbD: false },
        { nameField: "ah+2.5.1", lngName: "ah+2.5.1", chkbD: false },
        { nameField: "ah+2.5.2", lngName: "ah+2.5.1", chkbD: false },
        { nameField: "ah+2.1", lngName: "ah+2.1", chkbD: false },
        { nameField: "ah+2.2", lngName: "ah+2.2", chkbD: false },
        { nameField: "ah+1.5.1", lngName: "ah+1.5.1", chkbD: false },
        { nameField: "ah+1.5.2", lngName: "ah+1.5.1", chkbD: false },
        { nameField: "ah+1.1", lngName: "ah+1.1", chkbD: false },
        { nameField: "ah+1.2", lngName: "ah+1.2", chkbD: false },
        { nameField: "ah0_1", lngName: "ah0_1", chkbD: false },
        { nameField: "ah0_2", lngName: "ah0_2", chkbD: false },
        { nameField: "o+0.5", lngName: "o+0.5", chkbD: false },
        { nameField: "o+1", lngName: "o+1", chkbD: false },
        { nameField: "u+1", lngName: "u+1", chkbD: false },
        { nameField: "o+1.5", lngName: "o+1.5", chkbD: false },
        { nameField: "u+1.5", lngName: "u+1.5", chkbD: false },
        { nameField: "o+2", lngName: "o+2", chkbD: false },
        { nameField: "u+2", lngName: "u+2", chkbD: false },
        { nameField: "o+2.5", lngName: "o+2.5", chkbD: false },
        { nameField: "u+2.5", lngName: "u+2.5", chkbD: false },
        { nameField: "o+3", lngName: "o+3", chkbD: false },
        { nameField: "u+3", lngName: "u+3", chkbD: false },
        { nameField: "o+3.5", lngName: "o+3.5", chkbD: false },
        { nameField: "u+3.5", lngName: "u+3.5", chkbD: false },
        { nameField: "o+4.5", lngName: "u+4.5", chkbD: false },
        { nameField: "o+5.5", lngName: "o+5.5", chkbD: false },
        { nameField: "u+5.5", lngName: "u+5.5", chkbD: false },
        { nameField: "bts_yes", lngName: "bts_yes", chkbD: false },
        { nameField: "bts_no", lngName: "bts_no", chkbD: false }
      ],
      listBuckmekers: [],
      multipleSelection: [],
      rules: {
        value1: [
          {
            type: "array",
            required: true,
            message: "Пожалуйста заполните диапазон дат",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    LangFormThead: function() {
      return this.$store.state.formThead;
    },
    prGetList: {
      get() {
        if (this.$store.getters["odds/getPrGetList"]) {
          this.getList();
        }
        return this.$store.getters["odds/getPrGetList"];
      },
      set(newValue) {
        this.$store.dispatch("odds/setPrGetList", newValue);
      }
    }
  },
  async created() {
    debugger;
    const { bookmakers } = await this.$axios.$get("/api/odds/getBookmakers");
    this.selectedBukmekers = bookmakers;
    const { events } = await this.$axios.$get("/api/odds/getMatch");
    this.selected = events;
    //this.listBuckmekers = await this.$axios.$get("/api/Bucmekers/")
    this.$store.commit("SET_FORMTHEAD", this.formThead);
    this.getList();
  },
  methods: {
    loadDataApi() {
      this.$confirm(
        "Перед загрузкой данных ранее загруженные данные будут удалены из базы данных. Подтверждаете удаление?",
        "Внимание!",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Отмена",
          type: "warning",
          center: true
        }
      ).then(() => {
        this.dialogDate = true;
        this.loadData();
      });
    },
    loadData(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.dialogDate = false;
          this.dialog = true;
          const { rc } = await this.$axios.$get("/api/Api/loadDataApiodds", {
            params: this.rulesForm.value1
          });
          if (rc === "ok") {
            this.getList();
            this.dialog = false;

            this.$notify({
              title: "Выполнено!",
              type: "success",
              message: "Данные загружены"
            });
          } else {
            this.dialog = false;
            this.$notify({
              title: "Ошибка!",
              type: "error",
              message: rc
            });
          }
        }
      });
    },
    handleInsertItem() {
      this.$store.commit("odds/RESET");
      this.$store.commit("odds/SET_DIALOG_FORM", true);
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
            "/api/odds/deleteAll",
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
      const { odds, total } = await this.$axios.$get("/api/odds", {
        params: this.listQuery
      });

      const deserodds = odds.map(v => JSON.parse(v.Data));
      console.log("deserodds", deserodds);

      this.desserts = deserodds;
      this.totalDesserts = total;
      this.prGetList = false;
    },

    editItem(item) {
      this.$store.commit("odds/SET_ODDS", Object.assign({}, item));
      this.$store.commit("odds/SET_DIALOG_FORM", true);
    },
    deleteItem(item) {
      this.$confirm("Вы подтверждаете удаление?", "Внимание", {
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        type: "warning",
        center: true
      })
        .then(async () => {
          const { rc } = await this.$axios.$delete("/api/odds", {
            params: item
          }); //, {
          if (rc === "ok") {
            await this.getList();
            this.$notify({
              title: "Выполнено!",
              message: "Коэффициент успешно удален",
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
            message: "Удаленеие коэффициента отменено"
          });
        });
    }
  }
};
</script>