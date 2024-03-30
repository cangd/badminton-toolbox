<template>
  <div class="calcview__container">
    <button
      class="calcview__container--button"
      v-for="pair in pairs"
      :key="pair.teamId"
      @click="onClick(pair)"
    >
      {{ pair.player1.name }} ({{ pair.player1.doubles }}) {{ pair.player2.name }} ({{
        pair.player2.doubles
      }})
    </button>
    <div class="calcview__container--presentedteam">
      <div class="calcview__presentedteam">{{ presentedTeam }}</div>
    </div>
    <div class="calcview__container--results">
      <div class="calcview__results" v-for="pair in filteredPairs" :key="pair.teamId">
        {{ pair.player1.name }} ({{ pair.player1.doubles }}) + {{ pair.player2.name }} ({{
          pair.player2.doubles
    <div>{{ presentedTeam }}</div>
    <div v-for="pair in filteredPairs" :key="pair.teamId" @click="onClick(pair)">
      {{ pair.player1.name }} {{ pair.player1.doubles }} {{ pair.player2.name }}
      {{ pair.player2.doubles }}
      </div>
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
const filteredPairs = ref<Pair[]>()
const mainTeam = ref<Pair>()
const mainP1 = ref<string>()
const mainP2 = ref<string>()

onMounted(() => {
  players.value = getPlayersFromSessionStorage()
})

const pairs = computed<Pair[]>(() => {
  return generateUniquePairs(players.value)
})

function onClick(team: Pair) {
  filteredPairs.value = filterPairs(team.player1.id, team.player2.id)
  mainTeam.value = team
  mainP1.value = `${team.player1.name} (${team.player1.doubles})`
  mainP2.value = `${team.player2.name} (${team.player2.doubles})`
  console.log('Filtered', filteredPairs.value)
  presentedTeam.value = `Festgelegtes Doppel: ${mainP1.value} + ${mainP2.value} = ${team.points}`
}

function filterPairs(id1: number, id2: number): Pair[] {
  // const filtered = pairs.value
  const filtered = pairs.value.filter(
    (pair) =>
      pair.player1.id !== id1 &&
      pair.player2.id !== id1 &&
      pair.player1.id !== id2 &&
      pair.player2.id !== id2
  )

  return filtered
}

</script>

<style lang="scss" scoped>
.calcview__container {
  &--button {
    flex-wrap: wrap;
  }

  &--presentedteam {
    color: green;
  }

  &--results {
    flex-direction: column;
  }
}

.calcview__results {
  flex-direction: column;
}
</style>
