<template>
  <h1>{{ header }}</h1>
  <div class="rangliste">
    <input v-model="newPlayerName" type="text" placeholder="Name" />
    <input v-model="newSinglesRating" type="text" placeholder="Einzelwertung" />
    <input v-model="newDoublesRating" type="text" placeholder="Doppelwertung" />
    <button @click="clickAdd">Add {{newPlayer}} </button>
  </div>
  <!-- <RanglisteVue :players="players" /> -->
  <Table :players="players"></Table>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type Player from '@/models/Player.js'
import RanglisteVue from '@/components/rangliste/Rangliste.vue'
import Table from '../components/rangliste/Table.vue'

const defaultPlayers: Player[] = [
  { name: 'Cang', singles: '140', doubles: '80' },
  { name: 'Anton', singles: '150', doubles: '100' },
  { name: 'Brecher', singles: '160', doubles: '110' },
  { name: 'Richtiger Otto', singles: '3000', doubles: '3000' }
]

const header = ref('Rangliste')
const newPlayerName = ref('')
const newSinglesRating = ref('')
const newDoublesRating = ref('')
const players = ref<Player[]>([])

onMounted(() => {
  const storedPlayers = getPlayersFromSessionStorage()
  if (storedPlayers.length > 0) {
    
    players.value = storedPlayers
  } else {
    players.value = defaultPlayers
  }
  console.log('Number of players', players.value.length)
})

const newPlayer = computed(() => {
  if (newPlayerName.value && newSinglesRating.value && newDoublesRating.value) {
    return `${newPlayerName.value}(${newSinglesRating.value}/${newDoublesRating.value})`
  }
});

function clickAdd(): void {
  players.value.push({
    name: newPlayerName.value,
    singles: newSinglesRating.value,
    doubles: newDoublesRating.value
  })
  saveArrayToSessionStorage('myRangliste', players.value)
  clearForm()
}

function clearForm(): void {
  newPlayerName.value = ''
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

function getPlayersFromSessionStorage(): Player[] {
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
    flex-direction: row;
    justify-content: center;
  }
}

ul {
  list-style-type: none;
}
</style>
