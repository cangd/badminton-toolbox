<template>
  <div class="addPlayer">
    <v-col cols="12" md="5">
      <v-text-field
        id="name"
        class="addPlayer__name"
        v-model="newPlayerName"
        :class="{ addPlayer__error: hasNameError }"
        clearable
        label="New Player"
        prepend-inner-icon="mdi-badminton"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        id="singles"
        class="addPlayer__singles"
        v-model="newSinglesRating"
        :class="{ addPlayer__error: hasSinglesError }"
        clearable
        label="Einzelwertung"
        prepend-inner-icon="mdi-account"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        id="doubles"
        class="addPlayer__doubles"
        v-model="newDoublesRating"
        :class="{ addPlayer__error: hasDoublesError }"
        clearable
        label="Doppelwertung"
        prepend-inner-icon="mdi-account-multiple"
      ></v-text-field>
    </v-col>

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
  return !players.value.every((p) => p.name !== newPlayerName.value || p.name === '')
})

const hasSinglesError = computed<boolean>(() => {
  if (!props.playersList) {
    return false // or handle the case when players is undefined
  }
  return !players.value.every((p) => p.singles !== newSinglesRating.value || p.singles === '')
})

const hasDoublesError = computed<boolean>(() => {
  if (!props.playersList) {
    return false // or handle the case when players is undefined
  }
  1
  return !players.value.every((p) => p.doubles !== newDoublesRating.value || p.doubles === '')
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
