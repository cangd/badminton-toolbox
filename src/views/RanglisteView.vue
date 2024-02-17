<template>
  <div class="rangliste">
    <h1>{{ header }}</h1>
    <input v-model="newPlayer" type="text" placeholder="Name" />
    <input v-model="newSinglesRating" type="text" placeholder="Einzelwertung" />
    <input v-model="newDoublesRating" type="text" placeholder="Doppelwertung" />
    <!-- // TODO: Save to local storage  -->
    <button @click="clickAdd">Add</button>
    <div v-if="newPlayer" class="summary">
      <div>{{ newPlayer }} ({{ newSinglesRating }} / {{ newDoublesRating }})</div>
    </div>
    <RanglisteVue :players="players" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type Player from '@/models/Player.js'
import RanglisteVue from '@/components/rangliste/Rangliste.vue';

const header = ref('Rangliste')

const newPlayer = ref('')
const newSinglesRating = ref('')
const newDoublesRating = ref('')

// TODO: Get from localstorage
const players = ref<Player[]>([
  { name: 'Cang', singles: '140', doubles: '80' },
  { name: 'Anton', singles: '150', doubles: '100' },
  { name: 'Brecher', singles: '160', doubles: '110' }
])

function clickAdd(): void {
  players.value.push({
    name: newPlayer.value,
    singles: newSinglesRating.value,
    doubles: newDoublesRating.value
  })
  clearForm()
}

function clearForm(): void {
  newPlayer.value = ''
  newSinglesRating.value = ''
  newDoublesRating.value = ''
}
</script>

<style>
@media (min-width: 1024px) {
  .rangliste {
    min-height: 100vh;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    justify-content: center;
  }
}

ul {
  list-style-type: none;
}
</style>
