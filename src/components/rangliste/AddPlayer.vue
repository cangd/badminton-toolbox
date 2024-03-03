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
    <button v-if="isFormFilled()" class="addPlayer_button" @click="clickAdd" id="button">
      Add {{ newPlayer }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  getLastIdFromLocalStorage,
  saveLastIdToLocalStorage
} from '@/helper/rangliste/lastIdStoragehelper.js'
import type Player from '@/models/Player.js'
import { computed, ref } from 'vue'

const emit = defineEmits<{ (e: 'update:players', player: Player): void }>()

const newPlayerName = ref('')
const newSinglesRating = ref('')
const newDoublesRating = ref('')
let lastId: number = 0

const isFormFilled = ref(() => {
  return newPlayerName.value && newSinglesRating.value && newDoublesRating.value
})

const newPlayer = computed(() => {
  return `${newPlayerName.value}(${newSinglesRating.value}/${newDoublesRating.value})`
})

function clickAdd(): void {
  const newId = createNewPlayerId()
  const newPlayer: Player = {
    id: newId,
    name: newPlayerName.value,
    singles: newSinglesRating.value,
    doubles: newDoublesRating.value
  }
  emit('update:players', newPlayer)
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
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .addPlayer {
    display: flex;
    justify-content: center;
  }
}
</style>
