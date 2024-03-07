<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title> <RouterLink to="/"> Application </RouterLink></v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item>
          <RouterLink to="/rangliste">Rangliste </RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <div>
        <RouterView />
      </div>
    </v-main>
  </v-layout>
  <link
    href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
    rel="stylesheet"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
</script>
