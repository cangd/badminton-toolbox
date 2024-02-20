<template>
  <div class="rangliste">
    <h1>{{ header }}</h1>
    <input v-model="newPlayer" type="text" placeholder="Name" />
    <input v-model="newSinglesRating" type="text" placeholder="Einzelwertung" />
    <input v-model="newDoublesRating" type="text" placeholder="Doppelwertung" />
    <button @click="clickAdd">Add</button>
    <div v-if="newPlayer" class="summary">
      <div>{{ newPlayer }} ({{ newSinglesRating }} / {{ newDoublesRating }})</div>
    </div>
    <RanglisteVue :players="players" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type Player from '@/models/Player.js'
import RanglisteVue from '@/components/rangliste/Rangliste.vue'

const defaultPlayers: Player[] = [
  { name: 'Cang', singles: '140', doubles: '80' },
  { name: 'Anton', singles: '150', doubles: '100' },
  { name: 'Brecher', singles: '160', doubles: '110' },
  { name: 'Richtiger Otto', singles: '3000', doubles: '3000' }
];

const header = ref('Rangliste');
const newPlayer = ref('');
const newSinglesRating = ref('');
const newDoublesRating = ref('');
const players = ref<Player[]>([]);

onMounted(() => {
  const storedPlayers = getPlayersFromSessionStorage()
  if (storedPlayers.length > 0) {
    players.value = storedPlayers;
  } else {
    players.value = defaultPlayers;
  }
})

function clickAdd(): void {
  players.value.push({
    name: newPlayer.value,
    singles: newSinglesRating.value,
    doubles: newDoublesRating.value
  })
  saveArrayToSessionStorage('myRangliste', players.value)
  clearForm()
}

function clearForm(): void {
  newPlayer.value = ''
  newSinglesRating.value = ''
  newDoublesRating.value = ''
}

function saveArrayToSessionStorage(key: string, array: any): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(array))
    console.log('Array saved to session storage successfully.', array)
  } catch (error) {
    console.error('Error saving array to session storage:', error)
  }
}

function getPlayersFromSessionStorage(): Player[]  {
  const playersJSON = sessionStorage.getItem('myRangliste')
  const myRangliste = playersJSON ? JSON.parse(playersJSON) : []
  console.log('MyRangliste', myRangliste)
  return myRangliste
}

</script>

<style>
@media (min-width: 1024px) {
  .rangliste {
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
