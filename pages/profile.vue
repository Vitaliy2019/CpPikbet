<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-toolbar color="primary" dark flat dense cad>
            <v-toolbar-title class="subheading">Профиль</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class>
            <main-form></main-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MainForm from "@/components/widgets/form/setup/MainForm";
export default {
  name: "app-setup",
  layout: "dashboard",
  components: { MainForm },
  data() {
    return {};
  }
};
</script>
