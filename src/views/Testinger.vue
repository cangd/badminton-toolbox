<template>
  <div class="ranglisteView">
    <AddPlayer class="ranglisteView_addPlayer" v-model:playersList="players" />
    <TablePlayers class="ranglisteView_tablePlayers" v-model:playersList="players" />
  </div>
  <DoublesSimulator class="ranglisteView_tablePlayers" :playersList="players"></DoublesSimulator>
</template>

<script setup lang="ts">
import AddPlayer from '@/components/rangliste/AddPlayer.vue'
import TablePlayers from '@/components/rangliste/TablePlayers.vue'
import { defaultPlayers } from '@/helper/defaultPlayers'
import { saveLastIdToLocalStorage } from '@/helper/rangliste/lastIdStoragehelper.js'
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper.js'
import type Player from '@/models/Player.js'
import { onMounted, ref } from 'vue'
import DoublesSimulator from '@/views/DoublesSimulator.vue'

const players = ref<Player[]>([])

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
  display: block;
  align-items: center;
  align-content: center;
  flex-direction: row;
  justify-content: center;
}

.ranglisteView_addPlayer {
  margin-top: 20px;
}

.ranglisteView_tablePlayers {
  padding-bottom: 20px;
}
</style>
