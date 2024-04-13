<template>
  <div class="ranglisteView">
    <HideBar
      class="ranglisteView_hidebar mt-n14 mt-sm-1 mb-5"
      v-model:displayAddPlayer="showAddPlayer"
      v-model:displayTable="showTable"
    >
    </HideBar>
    <AddPlayer v-if="showAddPlayer" class="ranglisteView_addPlayer" v-model:playersList="players" />
    <TableToolbar
      v-if="showTable"
      v-model:teamFilter="filterTeams"
      @update:teamFilter="filterPlayers"
    ></TableToolbar>
    <TablePlayers
      v-if="showTable"
      class="ranglisteView_tablePlayers"
      v-model:playersList="players"
      v-model:playersInSimulator="playersInSimulator"
    />
  </div>
  <DoublesSimulator
    v-if="playersInSimulator.length >= 4"
    class="ranglisteView_tablePlayers"
    :playersList="playersInSimulator"
  ></DoublesSimulator>
</template>

<script setup lang="ts">
import AddPlayer from '@/components/rangliste/AddPlayer.vue';
import HideBar from '@/components/rangliste/HideBar.vue';
import TablePlayers from '@/components/rangliste/TablePlayers.vue';
import TableToolbar from '@/components/rangliste/TableToolbar.vue';
import DoublesSimulator from '@/components/simulator/DoublesSimulator.vue';
import { defaultPlayers } from '@/helper/defaultPlayers';
import { saveLastIdToLocalStorage } from '@/helper/rangliste/lastIdStoragehelper.js';
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper.js';
import type Player from '@/models/Player.js';
import type { TeamEnum } from '@/models/TeamEnum';
import { onMounted, ref } from 'vue';

const players = ref<Player[]>([]);
const playersInSimulator = ref<Player[]>([]);
const storedPlayers = ref<Player[]>([]);
const filterTeams = ref<TeamEnum[]>([]);
const showTable = ref<boolean>(true);
const showAddPlayer = ref<boolean>(true);

onMounted(() => {
  storedPlayers.value = initPlayerList();
  const lastPlayer = storedPlayers.value.length - 1;
  saveLastIdToLocalStorage(storedPlayers.value[lastPlayer].id);
  addPlayersToSimulator();
});

function filterPlayers(): Player[] {
  const playerList = storedPlayers.value;
  if (filterTeams.value.length > 0) {
    const foo = playerList.filter((player) => filterTeams.value.includes(player.team));
    return (players.value = foo);
  } else {
    return (players.value = playerList);
  }
}

function initPlayerList(): Player[] {
  const storedPlayers = getPlayersFromSessionStorage();
  if (storedPlayers.length > 0) {
    return (players.value = storedPlayers);
  } else {
    return (players.value = defaultPlayers);
  }
}

function addPlayersToSimulator() {
  for (const player of players.value) {
    if (player.isInSimulator === undefined) {
      player.isInSimulator = true;
    }
    if (player.isInSimulator === true) {
      playersInSimulator.value.push(player);
    }
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
  margin-bottom: 20px;
}

.ranglisteView_tablePlayers {
  padding-bottom: 20px;
}
</style>
