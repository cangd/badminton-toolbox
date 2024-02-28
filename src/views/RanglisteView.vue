<template>
  <h1>{{ header }}</h1>
  <div class="rangliste">
    <input v-model="newPlayerName" type="text" placeholder="Name" id="name" />
    <input v-model="newSinglesRating" type="text" placeholder="Einzelwertung" id="singles" />
    <input v-model="newDoublesRating" type="text" placeholder="Doppelwertung" id="doubles" />
    <button class="rangliste_button" @click="clickAdd" id="button">Add {{ newPlayer }}</button>
  </div>
  <RanglisteVue :players="players" />
</template>

<script setup lang="ts">
import RanglisteVue from '@/components/rangliste/Rangliste.vue'
import type Player from '@/models/Player.js'
import { computed, onMounted, ref } from 'vue'

const defaultPlayers: Player[] = [
  { id: 1, name: 'Cang', singles: '140', doubles: '80' },
  { id: 2, name: 'Anton', singles: '150', doubles: '100' },
  { id: 3, name: 'Brecher', singles: '160', doubles: '110' },
  { id: 4, name: 'Richtiger Otto', singles: '3000', doubles: '3000' }
]

const header = ref('Rangliste')
const newPlayerName = ref('')
const newSinglesRating = ref('')
const newDoublesRating = ref('')
const players = ref<Player[]>([])
let lastId: number = 0

onMounted(() => {
  const storedPlayers = initPlayerList()
  const lastPlayer = storedPlayers.length - 1
  saveLastIdToLocalStorage(storedPlayers[lastPlayer].id)
})

const newPlayer = computed(() => {
  return `${newPlayerName.value}(${newSinglesRating.value}/${newDoublesRating.value})`
})

function initPlayerList(): Player[] {
  const storedPlayers = getPlayersFromSessionStorage()
  if (storedPlayers.length > 0) {
    console.log('Load stored player list')
    return (players.value = storedPlayers)
  } else {
    console.log('Load default player list')
    return (players.value = defaultPlayers)
  }
}

function clickAdd(): void {
  const id = createNewPlayerId()

  players.value.push({
    id,
    name: newPlayerName.value,
    singles: newSinglesRating.value,
    doubles: newDoublesRating.value
  })
  saveArrayToSessionStorage('myRangliste', players.value)
  clearForm()
}

function createNewPlayerId(): number {
  lastId = getLastIdFromLocalStorage()
  const newPlayerId = lastId + 1
  saveLastIdToLocalStorage(newPlayerId)
  return newPlayerId
}

function clearForm(): void {
  newPlayerName.value = ''
  newSinglesRating.value = ''
  newDoublesRating.value = ''
}

function getLastIdFromLocalStorage(): number {
  const storedId = localStorage.getItem('lastId')
  const jsonStoredId = storedId ? JSON.parse(storedId) : '0'
  return parseInt(jsonStoredId)
}

function saveLastIdToLocalStorage(id: number): void {
  localStorage.setItem('lastId', JSON.stringify(id))
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
