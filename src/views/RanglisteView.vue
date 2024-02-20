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

const header = ref('Rangliste')

const newPlayer = ref('')
const newSinglesRating = ref('')
const newDoublesRating = ref('')

const players = ref<Player[]>([
  { name: 'Cang', singles: '140', doubles: '80' },
  { name: 'Anton', singles: '150', doubles: '100' },
  { name: 'Brecher', singles: '160', doubles: '110' }
])

onMounted(() => {
  const foo = getPlayersFromLocalStorage()
  console.log('Stored players', foo)
  players.value = foo;
})

function clickAdd(): void {
  players.value.push({
    name: newPlayer.value,
    singles: newSinglesRating.value,
    doubles: newDoublesRating.value
  })
  saveArrayToLocalStorage('myRangliste', players.value)
  clearForm()
}

function clearForm(): void {
  newPlayer.value = ''
  newSinglesRating.value = ''
  newDoublesRating.value = ''
}

function saveArrayToLocalStorage(key: string, array: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(array))
    console.log('Array saved to local storage successfully.', array)
  } catch (error) {
    console.error('Error saving array to local storage:', error)
  }
}

function getPlayersFromLocalStorage(): Player[]  {
  const playersJSON = localStorage.getItem('myRangliste')
  const myRangliste = playersJSON ? JSON.parse(playersJSON) : []
  console.log(myRangliste)
  return myRangliste
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
