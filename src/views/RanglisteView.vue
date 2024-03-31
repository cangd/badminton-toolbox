<template>
  <h1>{{ header }}</h1>
  <AddPlayer v-model:playersList="players" />
  <TablePlayers :playersList="players" />
</template>

<script setup lang="ts">
import AddPlayer from '@/components/rangliste/AddPlayer.vue'
import TablePlayers from '@/components/rangliste/TablePlayers.vue'
import { saveLastIdToLocalStorage } from '@/helper/rangliste/lastIdStoragehelper.js'
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper.js'
import type Player from '@/models/Player.js'
import { TeamEnum } from '@/models/TeamEnum'
import { onMounted, ref } from 'vue'

const defaultPlayers: Player[] = [
  { id: 1, name: 'Cang', singles: '140', doubles: '80', team: TeamEnum.M2 },
  { id: 2, name: 'Anton', singles: '150', doubles: '100', team: TeamEnum.E },
  { id: 3, name: 'Brecher', singles: '60', doubles: '110', team: TeamEnum.E },
  { id: 4, name: 'Richtiger Otto', singles: '3000', doubles: '3000', team: TeamEnum.E }
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
</script>

<style>
.rangliste {
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: row;
  justify-content: center;
}

h1 {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
