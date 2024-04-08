<template>
  <AddPlayer class="ranglisteView_addPlayer" v-model:playersList="players" />
  <TablePlayers :playersList="players" v-model:playersInSimulator="playersInSimulator" />
</template>

<script setup lang="ts">
import AddPlayer from '@/components/rangliste/AddPlayer.vue'
import TablePlayers from '@/components/rangliste/TablePlayers.vue'
import { defaultPlayers } from '@/helper/defaultPlayers'
import { saveLastIdToLocalStorage } from '@/helper/rangliste/lastIdStoragehelper.js'
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper.js'
import type Player from '@/models/Player.js'
import { onMounted, ref } from 'vue'

const players = ref<Player[]>([])
const playersInSimulator = ref<Player[]>([])

onMounted(() => {
  const storedPlayers = initPlayerList()
  const lastPlayer = storedPlayers.length - 1
  saveLastIdToLocalStorage(storedPlayers[lastPlayer].id)
})

function initPlayerList(): Player[] {
  const storedPlayers = getPlayersFromSessionStorage()
  if (storedPlayers.length > 0) {
    return (players.value = storedPlayers)
  } else {
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

.ranglisteView_addPlayer {
  margin: 20px;
}
</style>
