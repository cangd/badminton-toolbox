<template>
  <div>
    <v-row align="center" justify="center">
      <v-col class="testinger" cols="auto">
        <v-card
          class="mx-auto"
          min-width="344"
          prepend-icon="mdi-numeric-1"
          append-icon="mdi-account-multiple"
          title="Christopher & Sebastian"
          subtitle="300"
          color="green"
        >
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card
          class="mx-auto"
          min-width="344"
          prepend-icon="mdi-numeric-2"
          append-icon="mdi-account-multiple"
          title="Anton & Berta"
          subtitle="310"
          color="green"
        >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const avatarUrl = computed(() => {
  return 'https://randomuser.me/api/portraits/women/8.jpg'
})
</script>

<style lang="scss" scoped>
.testinger {
  display: flex;
  flex-direction: row;
}
.pairingsComp__allPairs {
  display: flex;
  flex-direction: column;
}
.pairingsComp__pairRow {
  display: flex;
  justify-content: space-evenly;
  flex-grow: 3;
}
.pairingsComp__pairItem {
  display: flex;
}
</style>
