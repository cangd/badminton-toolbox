<template>
  <div class="addPlayer">
    <input
      class="addPlayer__name"
      :class="{ addPlayer__error: hasNameError }"
      v-model="newPlayerName"
      type="text"
      placeholder="Name"
      id="name"
    />
    <input
      class="addPlayer__singles"
      :class="{ addPlayer__error: hasSinglesError }"
      v-model="newSinglesRating"
      type="text"
      placeholder="Einzelwertung"
      id="singles"
    />
    <input
      class="addPlayer__doubles"
      :class="{ addPlayer__error: hasDoublesError }"
      v-model="newDoublesRating"
      type="text"
      placeholder="Doppelwertung"
      id="doubles"
    />
    <button
      v-if="isFormFilledWithoutErrors()"
      class="addPlayer__button"
      @click="clickAdd"
      id="button"
    >
      Add {{ newPlayer }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  getLastIdFromLocalStorage,
  saveLastIdToLocalStorage
} from '@/helper/rangliste/lastIdStoragehelper.js'
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper'
import type Player from '@/models/Player.js'
import { computed, ref } from 'vue'

const newPlayerName = ref('')
const newSinglesRating = ref('')
const newDoublesRating = ref('')
let lastId: number = 0

const players = computed<Player[]>(() => {
  return getPlayersFromSessionStorage()
})

const hasNameError = computed<boolean>(() => {
  return !players.value.every((p) => p.name !== newPlayerName.value)
})

const hasSinglesError = computed<boolean>(() => {
  return !players.value.every((p) => p.singles !== newSinglesRating.value)
})

const hasDoublesError = computed<boolean>(() => {
  return !players.value.every((p) => p.doubles !== newDoublesRating.value)
})

const emit = defineEmits<{ (e: 'update:players', player: Player): void }>()

const isFormFilledWithoutErrors = ref(() => {
  return (
    !hasNameError.value &&
    !hasSinglesError.value &&
    !hasDoublesError.value &&
    newPlayerName.value &&
    newSinglesRating.value &&
    newDoublesRating.value
  )
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

    &__error {
      border: 3px solid red;
    }
  }
}
</style>
