<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title @click="clickRangliste">
        <RouterLink to="/"> {{ title }} </RouterLink></v-app-bar-title
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item @click="clickRangliste">
          <RouterLink to="/rangliste">Rangliste</RouterLink>
        </v-list-item>
        <v-list-item @click="clickFoo">
          <RouterLink to="/calc">DoppelRechner</RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex justify-center" style="min-height: 300px">
      <div class="app">
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

const title = ref('Rangliste')

function clickRangliste() {
  return (title.value = 'Rangliste')
}

function clickFoo() {
  return (title.value = 'Foo')
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
}
</style>
