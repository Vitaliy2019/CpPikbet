<template>
  <div>
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
      <el-table-column label="Id" prop="Id"/>
      <el-table-column label="Наименование" prop="Name"/>
      <el-table-column label="Рейтинг" prop="Rating"/>
      <el-table-column label="Описание" prop="Description"/>

      <el-table-column label="Действие">
        <template slot-scope="scope">
          <v-icon small class="mr-2" @click="editItem(scope.row)">edit</v-icon>
          <v-icon small @click="deleteItem(scope.row)">delete</v-icon>
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
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      valid: true,
      listLoading: false,
      nameRules: [v => !!v || "Требуется имя букмекера"],
      descRules: [v => !!v || "Требуется описание букмекера"],
      dialog: false,
      editedIndex: -1,
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
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
      this.dialog = false;
    },
    save() {
      if (this.$refs.form.validate()) {
        this.insertItem();
      }
    },
    async insertItem() {
      const { rc } = await this.$axios.$post("/api/Bucmekers", this.bucmekers);
      if (rc === "ok") {
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
      this.editedIndex = this.desserts.indexOf(item);
      this.bucmekers = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.$confirm("Вы подтверждаете удаление?", "Внимание", {
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        type: "warning",
        center: true
      })
        .then(async () => {
          debugger;
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