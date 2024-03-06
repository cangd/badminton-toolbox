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
import { savePlayersToSessionStorage } from '@/helper/rangliste/playersStorageHelper'
import type Player from '@/models/Player.js'
import { computed, ref } from 'vue'

const newPlayerName = ref('')
const newSinglesRating = ref('')
const newDoublesRating = ref('')

const props = defineProps<{
  playersList: Player[]
}>()

const emit = defineEmits<{ (e: 'update:playersList', player: Player[]): void }>()

const players = computed<Player[]>({
  get: () => {
    return props.playersList
  },
  set: (value: Player[]) => {
    emit('update:playersList', value)
  }
})

const hasNameError = computed(() => {
  if (!props.playersList) {
    return false // or handle the case when players is undefined
  }
  return !players.value.every((p) => p.name !== newPlayerName.value)
})

const hasSinglesError = computed<boolean>(() => {
  if (!props.playersList) {
    return false // or handle the case when players is undefined
  }
  return !players.value.every((p) => p.singles !== newSinglesRating.value)
})

const hasDoublesError = computed<boolean>(() => {
  if (!props.playersList) {
    return false // or handle the case when players is undefined
  }
  1
  return !players.value.every((p) => p.doubles !== newDoublesRating.value)
})

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
  // Check if players.value is defined before using it
  if (players.value) {
    players.value.push(newPlayer)
    savePlayersToSessionStorage(players.value)
  } else {
    players.value = [newPlayer] // Initialize players with the newPlayer if it's not defined
  }

  clearForm()
}

function createNewPlayerId(): number {
  const lastId: number = getLastIdFromLocalStorage() | 0
  const newPlayerId: number = lastId + 1
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
