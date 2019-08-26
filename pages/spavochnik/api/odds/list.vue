<template>
  <v-container>
    <div class="my-2">
      <el-tooltip effect="dark" content="Введите значение для поиска и фильтраци">
        <el-select
          v-if="false"
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
              v-if="fruit.nameField==='Odd_date'"
              :format="formatDate.format"
              :time="scope.row[fruit.nameField]"
              :type="formatDate.type"
              :auto-update="formatDate.autoUpdate"
            />
            <span
              v-else-if="fruit.nameField==='MatchName'"
              style="margin-left: 10px"
            >{{ scope.row[fruit.nameField] }}</span>
            <span v-else style="margin-left: 10px">{{ scope.row[fruit.nameField] }}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="Действие">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Просмотреть коэффициент">
            <v-btn outline icon dark medium color="primary" @click="editItem(scope.row)">
              <v-icon small>search</v-icon>
            </v-btn>
          </el-tooltip>
          <el-tooltip effect="dark" content="Удалить коэффициент">
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
        { nameField: "id", lngName: "Id", chkbD: true },
        { nameField: "matchName", lngName: "Матч", chkbD: true },
        { nameField: "Odd_bookmakers", lngName: "Букмекер", chkbD: false },
        { nameField: "Odd_date", lngName: "Дата", chkbD: true },
        { nameField: "Odd_1", lngName: "Odd 1", chkbD: false },
        {
          nameField: "Odd_x",
          lngName: "Odd x",
          chkbD: true
        },
        { nameField: "Odd_2", lngName: "Odd 2", chkbD: true },
        { nameField: "Odd_1x", lngName: "Odd 1x", chkbD: true },
        { nameField: "Odd_12", lngName: "Odd 12", chkbD: true },
        {
          nameField: "Odd_x2",
          lngName: "Odd x2",
          chkbD: true
        },
        {
          nameField: "Ah_4_5_1",
          lngName: "Ah-4.5_1",
          chkbD: false
        },
        {
          nameField: "Ah_4_5_2",
          lngName: "Ah-4.5_2",
          chkbD: false
        },
        {
          nameField: "Ah_4_1",
          lngName: "Ah-4_1",
          chkbD: true
        },
        {
          nameField: "Ah_4_2",
          lngName: "Ah-4_2",
          chkbD: false
        },
        {
          nameField: "Ah_3_5_1",
          lngName: "Ah-3.5_1",
          chkbD: false
        },
        {
          nameField: "Ah_3_5_2",
          lngName: "Ah-3.5_2",
          chkbD: false
        },
        {
          nameField: "Ah_3_1",
          lngName: "Ah-3.1",
          chkbD: false
        },
        {
          nameField: "Ah_3_2",
          lngName: "Ah-3.2",
          chkbD: false
        },
        {
          nameField: "Ah_2_5_1",
          lngName: "Ah_2.5_1",
          chkbD: false
        },
        {
          nameField: "Ah_2_5_2",
          lngName: "Ah-2.5_2",
          chkbD: false
        },
        {
          nameField: "Ah_2_1",
          lngName: "Ah-2_1",
          chkbD: false
        },
        {
          nameField: "Ah_2_2",
          lngName: "Ah-2_2",
          chkbD: false
        },
        {
          nameField: "Ah_1_5_1",
          lngName: "Ah-1.5_1",
          chkbD: false
        },
        { nameField: "Ah_1_5_2", lngName: "Ah-1.5_2", chkbD: false },
        { nameField: "Ah_1_1", lngName: "Ah-1_1", chkbD: false },
        { nameField: "Ah_1_2", lngName: "Ah-1_2", chkbD: false },
        { nameField: "Ah_0_5_1", lngName: "Ah-0.5_1", chkbD: false },
        { nameField: "Ah_0_5_2", lngName: "Ah-0.5_2", chkbD: false },

        { nameField: "Ah_p4_5_1", lngName: "Ah+4.5_1", chkbD: false },
        { nameField: "Ah_p4_5_2", lngName: "Ah+4.5_2", chkbD: false },
        { nameField: "Ah_p4_1", lngName: "Ah+4_1", chkbD: false },
        { nameField: "Ah_p4_2", lngName: "Ah+4_2", chkbD: false },
        { nameField: "Ah_p3_5_1", lngName: "Ah+3.5_1", chkbD: false },
        { nameField: "Ah_p3_5_2", lngName: "Ah+3.5_2", chkbD: false },
        { nameField: "Ah_p3_2", lngName: "Ah+3_2", chkbD: false },
        { nameField: "Ah_p3_1", lngName: "Ah+3_1", chkbD: false },

        { nameField: "Ah_p2_5_1", lngName: "Ah+2.5_1", chkbD: false },
        { nameField: "Ah_p2_5_2", lngName: "Ah+2.5_2", chkbD: false },
        { nameField: "Ah_p2_1", lngName: "Ah+2_1", chkbD: false },
        { nameField: "Ah_p2_2", lngName: "Ah+2_2", chkbD: false },
        { nameField: "Ah_p1_5_1", lngName: "Ah+1.5_1", chkbD: false },
        { nameField: "Ah_p1_5_2", lngName: "Ah+1.5_2", chkbD: false },
        { nameField: "Ah_p1_1", lngName: "Ah+1_1", chkbD: false },
        { nameField: "Ah_p1_2", lngName: "Ah+1_2", chkbD: false },
        { nameField: "Ah0_1", lngName: "Ah0_1", chkbD: false },
        { nameField: "Ah0_2", lngName: "Ah0_2", chkbD: false },
        { nameField: "O_0_5", lngName: "O+0.5", chkbD: false },
        { nameField: "O_1", lngName: "O+1", chkbD: false },
        { nameField: "U_1", lngName: "U+1", chkbD: false },
        { nameField: "O_1_5", lngName: "O+1.5", chkbD: false },
        { nameField: "U_1_5", lngName: "U+1.5", chkbD: false },
        { nameField: "O_2", lngName: "O+2", chkbD: false },
        { nameField: "U_2", lngName: "U+2", chkbD: false },
        { nameField: "O_2_5", lngName: "O+2.5", chkbD: false },
        { nameField: "U_2_5", lngName: "U+2.5", chkbD: false },
        { nameField: "O_3", lngName: "O+3", chkbD: false },
        { nameField: "U_3", lngName: "U+3", chkbD: false },
        { nameField: "O_3_5", lngName: "O+3.5", chkbD: false },
        { nameField: "U_3_5", lngName: "U+3.5", chkbD: false },
        { nameField: "O_4", lngName: "O+4", chkbD: false },
        { nameField: "U_4", lngName: "U+4", chkbD: false },
        { nameField: "O_4_5", lngName: "O+4.5", chkbD: false },
        { nameField: "U_4_5", lngName: "U+4.5", chkbD: false },
        { nameField: "O_5", lngName: "O+5", chkbD: false },
        { nameField: "U_5", lngName: "U+5", chkbD: false },
        { nameField: "O_5_5", lngName: "O+5.5", chkbD: false },
        { nameField: "U_5_5", lngName: "U+5.5", chkbD: false },
        { nameField: "Bts_yes", lngName: "bts_yes", chkbD: false },
        { nameField: "Bts_no", lngName: "bts_no", chkbD: false }
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
  mounted() {
    //this.desserts.forEach(o => this.getMatch(o.match_id));
  },
  methods: {
    getMatch: async function(id) {
      const { matchName } = await this.$axios.$get(
        `/api/odds/getMatchEvent?match_id=${id}`
      );
      /*this.desserts
        .filter(o => o.match_id === id)
        .forEach(o => (o.match_id = matchName));*/
      //return matchName;
    },
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
          const { rc } = await this.$axios.$get("/api/Api/loadDataApiOdds", {
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
      const { jsonOdds, total } = await this.$axios.$get("/api/Odds", {
        params: this.listQuery
      });

      let deserOdds = jsonOdds.map(v => {
        let parseData = JSON.parse(v.Data);
        parseData.matchName = v.MatchName;
        parseData.id = v.Id;
        return parseData;
      });

      console.log("deserOdds", deserOdds);

      this.desserts = deserOdds;
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
          const { rc } = await this.$axios.$delete("/api/Odds", {
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