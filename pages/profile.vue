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
            <update-profile-admin></update-profile-admin>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UpdateProfileAdmin from "@/components/widgets/form/setup/UpdateProfileAdmin";
export default {
  name: "profile-settup-admin",
  layout: "dashboard",
  components: { UpdateProfileAdmin },
  data() {
    return {};
  }
};
</script>
