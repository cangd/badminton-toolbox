<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <RouterLink to="/"> {{ title }} </RouterLink></v-app-bar-title
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item>
          <RouterLink to="/simulator">Ranglisten-Tool</RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex justify-center" style="min-height: 300px">
      <v-container fluid>
        <div class="app">
          <RouterView />
        </div>
      </v-container>
    </v-main>
  </v-layout>
  <link
    href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
    rel="stylesheet"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { defaultPlayers } from './helper/defaultPlayers';
import {
  getPlayersFromSessionStorage,
  savePlayersToSessionStorage
} from './helper/rangliste/playersStorageHelper';

const drawer = ref(false);

const title = ref('Home');

onMounted(() => {
  if (getPlayersFromSessionStorage().length === 0) {
    savePlayersToSessionStorage(defaultPlayers);
  }
});
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
}
</style>
