<template>
  <div v-if="players.length > 0" class="tablePlayers__table">
    <div class="tablePlayers__head">
      <v-row class="justify-center hidden-xs">
        <v-col cols="12" sm="3">
          <div class="tablePlayers__head-player" @click="sortByName()">Player</div>
        </v-col>
        <v-col cols="12" sm="2">
          <div class="tablePlayers__head-singles" @click="sortBySingles()">Singles</div>
        </v-col>
        <v-col cols="12" sm="2">
          <div class="tablePlayers__head-doubles" @click="sortByDoubles()">Doubles</div>
        </v-col>
        <v-col cols="12" sm="2">
          <div class="tablePlayers__head-team">Team</div>
        </v-col>
        <v-col cols="12" md="1" sm="3">
          <div class="tablePlayers__head-action" @click="clickOnAction()">Action</div>
        </v-col>
      </v-row>
    </div>

    <div class="tablePlayers__players" v-for="(player, index) in players" :key="player.id">
      <v-row
        class="justify-center ma-1 my-xs-1"
        :class="{ tablePlayers__selected: isPlayerSelected(index) }"
      >
        <v-col cols="12" md="3" sm="3" xs="3" class="pa-1">
          <v-text-field
            class="tablePlayers__input-name"
            :class="{ tablePlayers__error: !isNameValid(index) }"
            v-model="player.name"
            hide-details
            :disabled="!player.isEditing"
            id="tablePlayersName"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2" sm="2" xs="2" class="pa-1">
          <v-text-field
            class="tablePlayers__input-singles"
            :class="{ tablePlayers__error: !isSinglesValid(index) }"
            v-model="player.singles"
            hide-details
            :disabled="!player.isEditing"
            id="tablePlayersSingles"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2" sm="2" xs="2" class="pa-1">
          <v-text-field
            class="tablePlayers__input-doubles"
            :class="{ tablePlayers__error: !isDoublesValid(index) }"
            v-model="player.doubles"
            hide-details
            :disabled="!player.isEditing"
            id="tablePlayersDoubles"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2" sm="2" xs="3" class="pa-1">
          <TeamSelector
            class="tablePlayers__selector-team"
            v-model="player.team"
            :isDisabled="!player.isEditing"
            :teamZugehoerigkeit="player.team"
            id="tablePlayersTeamSelector"
          >
          </TeamSelector>
        </v-col>

        <v-col class="py-2" cols="12" md="2" sm="3" xs="3">
          <v-btn
            v-if="!player.isEditing"
            icon="mdi-account-edit-outline"
            variant="plain"
            class="tablePlayers__action--edit"
            @click="editPlayer(index)"
            id="tablePlayersEdit"
          ></v-btn>
          <v-btn
            v-if="!player.isEditing && player.isInSimulator == false"
            icon="mdi-playlist-plus"
            variant="plain"
            class="tablePlayers__action--addToSimulator"
            @click="addToSimulator(index)"
            id="tablePlayersAddToSimulator"
          ></v-btn>
          <v-btn
            v-if="!player.isEditing && player.isInSimulator == true"
            icon="mdi-playlist-minus"
            variant="plain"
            class="tablePlayers__action--addToSimulator"
            @click="removeFromSimulator(player.id)"
            id="tablePlayersAddToSimulator"
          ></v-btn>
          <v-btn
            v-if="player.isEditing"
            icon="mdi-pencil-off-outline"
            variant="plain"
            class="tablePlayers__action--save"
            @click="savePlayer(index)"
            id="tablePlayersSave"
          ></v-btn>
          <v-btn
            v-if="player.isEditing"
            icon="mdi-delete"
            variant="plain"
            class="tablePlayers__action--delete"
            @click="deletePlayer(player.id)"
            id="tablePlayersDelete"
          ></v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
// Try to use this for the TEMPLATE INSTEAD
// https://vuetifyjs.com/en/components/data-tables/basics/#usage

import { savePlayersToSessionStorage } from '@/helper/rangliste/playersStorageHelper'
import type Player from '@/models/Player.js'
import { computed } from 'vue'
import TeamSelector from './TeamSelector.vue'

const props = defineProps<{
  playersList: Player[]
  playersInSimulator: Player[]
}>()

const emit = defineEmits<{
  (e: 'update:playersList', player: Player[]): void
  (e: 'update:playersInSimulator', player: Player[]): void
}>()

const players = computed<Player[]>({
  get: () => {
    return props.playersList
  },
  set: (value: Player[]) => {
    emit('update:playersList', value)
  }
})

const playersSimulator = computed<Player[]>({
  get: () => {
    return props.playersInSimulator
  },
  set: (value: Player[]) => {
    emit('update:playersInSimulator', value)
  }
})

const isNameValid = (index: number) => {
  const currentName = players.value[index].name
  return (
    players.value.every((player, i) => index === i || player.name !== currentName) &&
    currentName !== ''
  )
}

const isSinglesValid = (index: number) => {
  const currentSingles = players.value[index].singles
  return (
    players.value.every((player, i) => index === i || player.singles !== currentSingles) &&
    currentSingles !== ''
  )
}

const isDoublesValid = (index: number) => {
  const currentDoubles = players.value[index].doubles
  return (
    players.value.every((player, i) => index === i || player.doubles !== currentDoubles) &&
    currentDoubles !== ''
  )
}

function isPlayerSelected(index: number): boolean {
  return players.value[index].isInSimulator
}

function editPlayer(index: number) {
  players.value[index].isEditing = true
}

function savePlayer(index: number) {
  const player = players.value[index]
  // Check uniqueness of singles and doubles values
  const isUnique = players.value.every(
    (p) =>
      p.id === player.id ||
      (p.name !== player.name && p.singles !== player.singles && p.doubles !== player.doubles)
  )
  if (!isUnique) {
    alert('Name, Singles and Doubles values must be unique.')
    return
  }
  players.value[index].isEditing = false
  savePlayersToSessionStorage(players.value)
}

function deletePlayer(id: any) {
  const index = players.value.findIndex((player: { id: any }) => player.id === id)
  if (index !== -1) {
    players.value.splice(index, 1)
  }
  savePlayersToSessionStorage(players.value)
}

function addToSimulator(index: number) {
  const player = players.value[index]
  player.isInSimulator = true
  playersSimulator.value.push(player)
}

function removeFromSimulator(id: any) {
  const indexSimulator = playersSimulator.value.findIndex(
    (playerSimulator: { id: any }) => playerSimulator.id === id
  )
  const indexPlayer = players.value.findIndex((player: { id: any }) => player.id === id)

  const player = players.value[indexPlayer]
  player.isInSimulator = false
  if (indexSimulator !== -1) {
    playersSimulator.value.splice(indexSimulator, 1)
  }
}

function sortByName() {
  players.value.sort((a, b) => a.name.localeCompare(b.name))
}

function sortBySingles() {
  players.value.sort((a, b) => {
    const singlesA = parseInt(a.singles)
    const singlesB = parseInt(b.singles)
    return singlesA - singlesB
  })
}

function sortByDoubles() {
  players.value.sort((a, b) => {
    const doublesA = parseInt(a.doubles)
    const doublesB = parseInt(b.doubles)
    return doublesA - doublesB
  })
}

function clickOnAction() {
  const close = (i: number) => {
    savePlayer(i)
    players.value[i].isEditing = false
  }

  for (let i = 0; i < players.value.length; i++) {
    players.value[i].isEditing == true ? close(i) : (players.value[i].isEditing = true)
  }
}
</script>

<style lang="scss" scoped>
.tablePlayers {
  &__players {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__head {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    font-size: larger;
    font-style: italic;
  }

  &__action {
    margin-bottom: 20px;
  }

  &__error {
    border: 3px solid red;
  }

  &__head-action,
  &__head-player,
  &__head-singles,
  &__head-doubles {
    text-decoration: underline;
  }
}
*:disabled {
  background-color: dimgrey;
  color: white;
}

.tablePlayers__selected {
  border: 3px solid #4db6ac;
}
</style>
