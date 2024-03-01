<template>
  <div class="tablePlayers__table">
    Table of players:
    <table>
      <thead>
        <tr>
          <th class="tablePlayers__head">Player</th>
          <th class="tablePlayers__head">Singles</th>
          <th class="tablePlayers__head">Doubles</th>
          <th class="tablePlayers__head">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tablePlayers__players" v-for="(player, index) in players" :key="player.id">
          <td class="tablePlayers__name">
            <input
              class="tablePlayers__name--input"
              v-model="player.name"
              :disabled="!player.editing"
            />
          </td>
          <td class="tablePlayers__singles">
            <input
              class="tablePlayers__singles--input"
              v-model="player.singles"
              :disabled="!player.editing"
            />
          </td>
          <td class="tablePlayers__doubles">
            <input
              class="tablePlayers__doubles--input"
              v-model="player.doubles"
              :disabled="!player.editing"
            />
          </td>
          <td class="tablePlayers__action">
            <button
              class="tablePlayers__action--edit"
              @click="editPlayer(index)"
              v-if="!player.editing"
            >
              Edit
            </button>
            <button
              class="tablePlayers__action--save"
              @click="savePlayer(index)"
              v-if="player.editing"
            >
              Save
            </button>
            <button class="tablePlayers__action--delete" @click="deletePlayer(player.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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

function editPlayer(index: string | number) {
  players.value[index].editing = true
}

function savePlayer(index: string | number) {
  const player = players.value[index]
  // Check uniqueness of singles and doubles values
  const isUnique = players.value.every(
    (p) => p.id === player.id || (p.singles !== player.singles && p.doubles !== player.doubles)
  )
  if (!isUnique) {
    alert('Singles and Doubles values must be unique.')
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
    display: table-row;
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
}
*:disabled {
  background-color: dimgrey;
  color: white;
}
</style>
