<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-toolbar color="success" dark flat dense cad>
            <v-toolbar-title class="subheading">Данные Api</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class>
            <main-form-api></main-form-api>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MainFormApi from "@/components/widgets/form/api/MainFormApi";
export default {
  name: "app-setup",
  layout: "dashboard",
  components: { MainFormApi },
  data() {
    return {};
  },
  async fetch({ store }) {
    await store.dispatch("initApiKey");
  }
};
</script>
