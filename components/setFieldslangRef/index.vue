<template>
  <el-dialog :title="title" :visible.sync="setVisible" width="25%">
    <div>
      <ol>
        <li v-for="(item, index) in langFormThead" :key="index">
          <el-checkbox v-model="item.chkbD" :label="item.lngName"/>
        </li>
      </ol>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "SetFieldslangRef",
  props: { title: { type: String, default: "" } },
  data() {
    return {};
  },
  computed: {
    setVisible: {
      get() {
        return this.$store.state.setDialogVisible;
      },
      set(newValue) {
        this.$store.commit("SET_DIALOGVISIBLE", newValue);
      }
    },
    langFormThead: {
      get() {
        return this.$store.state.formThead;
      },
      set(newValue) {
        this.$store.commit("SET_FORMTHEAD", newValue);
      }
    }
  }
};
</script>
<style scoped>
</style>

