<template>
  <div v-if="players.length > 0" class="tablePlayers__table">
    <table>
      <thead>
        <tr>
          <th class="tablePlayers__head--player" @click="sortByName()">Player</th>
          <th class="tablePlayers__head--singles" @click="sortBySingles()">Singles</th>
          <th class="tablePlayers__head--doubles" @click="sortByDoubles()">Doubles</th>
        </tr>
      </thead>
    </table>

    <div class="tablePlayers__players" v-for="(player, index) in players" :key="player.id">
      <v-col cols="12" md="5">
        <v-text-field
          class="tablePlayers__name--input"
          :class="{ tablePlayers__error: !isNameValid(index) }"
          v-model="player.name"
          label="Name"
          hide-details
          :disabled="!player.editing"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          class="tablePlayers__singles--input"
          :class="{ tablePlayers__error: !isSinglesValid(index) }"
          v-model="player.singles"
          label="Singles ranking"
          hide-details
          :disabled="!player.editing"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          class="tablePlayers__doubles--input"
          :class="{ tablePlayers__error: !isDoublesValid(index) }"
          v-model="player.doubles"
          label="Doubles ranking"
          hide-details
          :disabled="!player.editing"
        ></v-text-field>
      </v-col>

      <td class="tablePlayers__action">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          class="tablePlayers__action--edit"
          @click="editPlayer(index)"
          v-if="!player.editing"
        ></v-btn>
        <v-btn
          icon="mdi-send-variant-outline"
          variant="plain"
          class="tablePlayers__action--save"
          @click="savePlayer(index)"
          v-if="player.editing"
        ></v-btn>
        <v-btn
          icon="mdi-delete"
          variant="plain"
          class="tablePlayers__action--delete"
          @click="deletePlayer(player.id)"
          v-if="player.editing"
        ></v-btn>
      </td>
    </div>
  </div>
</template>

<script setup lang="ts">
import { savePlayersToSessionStorage } from '@/helper/rangliste/playersStorageHelper'
import type Player from '@/models/Player.js'
import { computed } from 'vue'

const props = defineProps<{
  playersList: Player[]
}>()

const players = computed<Player[]>(() => {
  return props.playersList
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

function editPlayer(index: number) {
  players.value[index].editing = true
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
  players.value[index].editing = false
  savePlayersToSessionStorage(players.value)
}

function deletePlayer(id: any) {
  const index = players.value.findIndex((player: { id: any }) => player.id === id)
  if (index !== -1) {
    players.value.splice(index, 1)
  }
  savePlayersToSessionStorage(players.value)
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
</script>

<style lang="scss" scoped>
.tablePlayers {
  &__table {
    display: table;
    width: 100%;
    border-collapse: collapse;
  }

  &__players {
    display: flex;
  }

  &__action {
    display: flex;
    align-items: center;
  }

  &__cell,
  &__head {
    display: table-cell;
    border: 1px solid #000;
    padding: 8px;
  }

  &__head {
    font-size: larger;
    font-style: italic;
  }

  &__input {
    background-color: lightyellow;
  }
  &__error {
    border: 3px solid red;
  }
}
*:disabled {
  background-color: dimgrey;
  color: white;
}
</style>
