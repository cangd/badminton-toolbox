<template>
  <div>
    <button v-for="pair in pairs" :key="pair.teamId" @click="onClick(pair)">
      {{ pair.player1.name }} {{ pair.player1.doubles }} {{ pair.player2.name }}
      {{ pair.player2.doubles }}
    </button>
    <div>{{ presentedTeam }}</div>
    <div v-for="pair in filteredPairs" :key="pair.teamId" @click="onClick(pair)">
      {{ pair.player1.name }} {{ pair.player1.doubles }} {{ pair.player2.name }}
      {{ pair.player2.doubles }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateUniquePairs } from '@/helper/rangliste/generateUniquePairshelper'
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper'
import type Pair from '@/models/Pair'
import type Player from '@/models/Player'
import { computed, onMounted, ref } from 'vue'

const players = ref<Player[]>([])
const presentedTeam = ref<string>()

onMounted(() => {
  players.value = getPlayersFromSessionStorage()
})

const onClick = (team: Pair) => {
  presentedTeam.value = `${team.player1.name} + ${team.player2.name} sollen auf jeden Fall Doppel spielen`
}

const filteredPairs = computed<Pair[]>(() => {
  return {
    ...pairs.value
  }
})

const pairs = computed<Pair[]>(() => {
  return generateUniquePairs(players.value)
})
</script>

<style scoped></style>
