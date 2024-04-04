<template>
  <div class="doublesSimulator">
    <v-card flat theme="dark">
      <template v-slot:text>
        <v-text-field
          class="calcview__search-container"
          v-model="searchPairs"
          label="Suche nach Namen, HD1 oder M1"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        >
        </v-text-field>
      </template>
      <v-data-iterator :items="flatPairs" :items-per-page="itemsPerPage" :search="searchPairs">
        <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
          <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
            <v-card
              v-if="mainTeam"
              class="calcView__card"
              min-width="344"
              append-icon="mdi-account-multiple"
              :title="`${mainTeam.player1.name} (${mainTeam.player1.doubles}) [${mainTeam.player1.team}] + ${mainTeam.player2.name} (${mainTeam.player2.doubles}) [${mainTeam.player2.team}]`"
              :subtitle="mainTeam.points"
              color="teal-lighten-2"
            >
            </v-card>
            <div v-if="!mainTeam" class="text-truncate">
              &nbsp; Wähle ein Doppel, das gerantiert spielen soll
            </div>

            <div class="d-flex align-center">
              <v-btn class="me-8" variant="text" @click="onClickSeeAll">
                <span class="text-decoration-underline text-none">See all</span>
              </v-btn>

              <div class="d-inline-flex">
                <v-btn
                  :disabled="page === 1"
                  class="me-2"
                  icon="mdi-arrow-left"
                  size="small"
                  variant="tonal"
                  @click="prevPage"
                ></v-btn>

                <v-btn
                  :disabled="page === pageCount"
                  icon="mdi-arrow-right"
                  size="small"
                  variant="tonal"
                  @click="nextPage"
                ></v-btn>
              </div>
            </div>
          </h1>
        </template>

        <template v-slot:default="{ items }">
          <v-row>
            <v-col v-for="(item, i) in items" :key="i" cols="20" sm="3" xl="3">
              <v-sheet border>
                <v-list-item
                  class="calcView__listItem"
                  density="comfortable"
                  lines="two"
                  @click="onClick(item.raw)"
                >
                  {{ item.raw.p1 }}<br />
                  {{ item.raw.p2 }} <br />
                </v-list-item>
              </v-sheet>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer="{ page, pageCount }">
          <v-footer class="justify-space-between text-body-2 mt-4" color="surface-variant">
            Total pairs: {{ pairs.length }}

            <div>Page {{ page }} of {{ pageCount }}</div>
          </v-footer>
        </template>
      </v-data-iterator>
    </v-card>
    <v-card flat theme="dark">
      <template v-slot:text>
        <v-text-field
          class="calcview__search-container"
          v-model="searchTable"
          label="Suche nach Namen, HD2, M2, oder Wertung"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        >
        </v-text-field>
      </template>
      <v-data-table
        theme="dark"
        :items="dataTablePairs"
        :search="searchTable"
        :items-per-page="5"
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { generateUniquePairs } from '@/helper/pairs/generateUniquePairshelper'
import { pairsToDataTableMapper } from '@/helper/pairs/pairsToDataTableMapper'
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper'
import type Player from '@/models/Player'
import type DataTablePair from '@/models/pairs/DataTablePair'
import type FlatPair from '@/models/pairs/FlatPair'
import type Pair from '@/models/pairs/Pair'
import { computed, onMounted, ref } from 'vue'

const players = ref<Player[]>([])
const filteredPairs = ref<Pair[]>()
const dataTablePairs = ref<DataTablePair[]>()
const searchTable = ref<string>('')
const searchPairs = ref<string>('')
const allPairs = ref<DataTablePair[]>()
const mainTeam = ref<Pair>()

onMounted(() => {
  players.value = getPlayersFromSessionStorage()
  allPairs.value = pairsToDataTableMapper(pairs.value)
})

const pairs = computed<Pair[]>(() => {
  return generateUniquePairs(players.value)
})

const flatPairs = computed<FlatPair[]>(() => {
  return flattenPairs(pairs.value)
})

function onClick(team: FlatPair) {
  filteredPairs.value = filterPairs(team.p1Id, team.p2Id)
  mainTeam.value = mapFlatPairToPair(team)
  dataTablePairs.value = pairsToDataTableMapper(filteredPairs.value, mainTeam.value)
}

function filterPairs(id1: number, id2: number): Pair[] {
  const filtered = pairs.value.filter(
    (pair) =>
      pair.player1.id !== id1 &&
      pair.player2.id !== id1 &&
      pair.player1.id !== id2 &&
      pair.player2.id !== id2
  )

  return filtered
}

const itemsPerPage = ref(16)

function onClickSeeAll() {
  itemsPerPage.value = itemsPerPage.value === 16 ? pairs.value.length : 16
}

function flattenPairs(pairs: Pair[]): FlatPair[] {
  let flatPairs = []
  for (const pair of pairs) {
    const flatPair = {
      player1: pair.player1,
      p1: `${pair.player1.name} (${pair.player1.doubles}) [${pair.player1.team}]`,
      p1Id: pair.player1.id,
      player2: pair.player2,
      p2: `${pair.player2.name} (${pair.player2.doubles}) [${pair.player2.team}]`,
      p2Id: pair.player2.id,
      sumPoints: pair.points,
      teamId: pair.teamId
    }
    flatPairs.push(flatPair)
  }
  return flatPairs
}

function mapFlatPairToPair(team: FlatPair): Pair {
  return {
    teamId: team.teamId,
    player1: team.player1,
    player2: team.player2,
    points: team.sumPoints
  }
}
</script>

<style lang="scss" scoped>
.doublesSimulator {
  display: flex;
  flex-direction: column;
}

.doublesSimulator__listItem:active {
  background-color: #4db6ac;
}

.doublesSimulator__listItem_clicked {
  background-color: #4db6ac;
  border: 3px solid #4db6ac;
}

.doublesSimulator__card {
  margin: 20px;
}
</style>
