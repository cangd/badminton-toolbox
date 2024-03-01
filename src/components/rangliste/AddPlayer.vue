<template>
  <div class="addPlayer">
    <input
      class="addPlayer_name"
      v-model="newPlayerName"
      type="text"
      placeholder="Name"
      id="name"
    />
    <input
      class="addPlayer_singles"
      v-model="newSinglesRating"
      type="text"
      placeholder="Einzelwertung"
      id="singles"
    />
    <input
      class="addPlayer_doubles"
      v-model="newDoublesRating"
      type="text"
      placeholder="Doppelwertung"
      id="doubles"
    />
    <button class="addPlayer_button" @click="clickAdd" id="button">Add {{ newPlayer }}</button>
  </div>
</template>

<script setup lang="ts">
import {
  getLastIdFromLocalStorage,
  saveLastIdToLocalStorage
} from '@/helper/rangliste/lastIdStoragehelper.js'
import {
  getPlayersFromSessionStorage,
  savePlayersToSessionStorage
} from '@/helper/rangliste/playersStorageHelper.js'
import type Player from '@/models/Player.js'
import { computed, ref } from 'vue'

const emit = defineEmits<{ (e: 'update:players'): void }>()

const newPlayerName = ref('')
const newSinglesRating = ref('')
const newDoublesRating = ref('')
let lastId: number = 0

const newPlayer = computed(() => {
  return `${newPlayerName.value}(${newSinglesRating.value}/${newDoublesRating.value})`
})

const players = computed<Player[]>(() => {
  return getPlayersFromSessionStorage()
})

function clickAdd(): void {
  const id = createNewPlayerId()

  // eslint-disable-next-line vue/no-mutating-props
  players.value.push({
    id,
    name: newPlayerName.value,
    singles: newSinglesRating.value,
    doubles: newDoublesRating.value
  })
  savePlayersToSessionStorage(players.value)
  clearForm()
  emit('update:players')
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
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .addPlayer {
    display: flex;
    justify-content: center;
  }
}
</style>
