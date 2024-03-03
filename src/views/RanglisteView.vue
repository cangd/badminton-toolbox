<template>
  <h1>{{ header }}</h1>
  <AddPlayer @update:players="updatePlayers" />
  <TablePlayers :playersList="players" />
</template>

<script setup lang="ts">
import AddPlayer from '@/components/rangliste/AddPlayer.vue'
import TablePlayers from '@/components/rangliste/TablePlayers.vue'
import { saveLastIdToLocalStorage } from '@/helper/rangliste/lastIdStoragehelper.js'
import {
  getPlayersFromSessionStorage,
  savePlayersToSessionStorage
} from '@/helper/rangliste/playersStorageHelper.js'
import type Player from '@/models/Player.js'
import { onMounted, ref } from 'vue'

const defaultPlayers: Player[] = [
  { id: 1, name: 'Cang', singles: '140', doubles: '80' },
  { id: 2, name: 'Anton', singles: '150', doubles: '100' },
  { id: 3, name: 'Brecher', singles: '60', doubles: '110' },
  { id: 4, name: 'Richtiger Otto', singles: '3000', doubles: '3000' }
]

const header = ref('Rangliste')
const players = ref<Player[]>([])

onMounted(() => {
  const storedPlayers = initPlayerList()
  const lastPlayer = storedPlayers.length - 1
  saveLastIdToLocalStorage(storedPlayers[lastPlayer].id)
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

function updatePlayers(player: Player): void {
  players.value.push(player)
  savePlayersToSessionStorage(players.value)
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
