<template>
  <div class="doublesSimulator">
    <v-row>
      <v-col cols="12">
        <v-card flat theme="dark">
          <template v-slot:text>
            <v-text-field
              class="calcview__search-container"
              v-model="searchPairs"
              label="Name, HD1 oder M1"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            >
            </v-text-field>
          </template>
          <v-row>
            <v-col cols="12">
              <v-data-iterator
                :items="allPairs"
                :items-per-page="itemsPerPage"
                :search="searchPairs"
              >
                <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
                  <v-row>
                    <v-col
                      class="d-flex justify-md-start justify-center flex-sm-row"
                      cols="12"
                      md="9"
                      sm="12"
                      xs="6"
                    >
                      <v-card
                        v-if="mainTeam"
                        class="calcView__card"
                        append-icon="mdi-account-multiple"
                        :title="`${mainTeam.player1.name} [${mainTeam.player1.team}] + ${mainTeam.player2.name} [${mainTeam.player2.team}] (${parseInt(mainTeam.player1.doubles) + parseInt(mainTeam.player2.doubles)})`"
                        color="teal-lighten-2"
                      >
                      </v-card>

                      <div
                        v-if="!mainTeam"
                        class="d-flex align-center text-h6 font-weight-bold d-flex"
                      >
                        &nbsp; Wähle ein Doppel
                      </div>
                    </v-col>
                    <v-col
                      class="d-md-flex justify-md-end justify-xs-center flex-sm-row"
                      cols="12"
                      md="3"
                    >
                      <div class="d-flex justify-center align-center">
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
                    </v-col>
                  </v-row>
                </template>

                <template v-slot:default="{ items }">
                  <v-row>
                    <v-col v-for="(item, i) in items" :key="i" cols="12" lg="4" sm="6">
                      <v-sheet border>
                        <v-list-item
                          class="calcView__listItem"
                          density="comfortable"
                          lines="two"
                          @click="onClick(item.raw)"
                        >
                          {{ item.raw.player1.name }}({{ item.raw.player1.doubles }}) [{{
                            item.raw.player1.team
                          }}]
                          <br />
                          {{ item.raw.player2.name }} ({{ item.raw.player2.doubles }}) [{{
                            item.raw.player2.team
                          }}] <br />
                        </v-list-item>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </template>

                <template v-slot:footer="{ page, pageCount }">
                  <v-footer class="justify-space-between text-body-2 mt-4" color="surface-variant">
                    Total pairs: {{ allPairs.length }}

                    <div>Page {{ page }} of {{ pageCount }}</div>
                  </v-footer>
                </template>
              </v-data-iterator>
            </v-col>
          </v-row>
        </v-card>
        <v-row v-if="mainTeam">
          <v-col cols="12">
            <v-card flat theme="dark">
              <template v-slot:text>
                <v-text-field
                  class="calcview__search-container"
                  v-model="searchTable"
                  label="Name, HD1, M2, oder Wertung"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  hide-details
                  single-line
                >
                </v-text-field>
              </template>
              <v-data-table
                theme="dark"
                :headers="tableHeaders"
                :items="possiblePairs"
                :search="searchTable"
                :items-per-page="5"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>
                      <!-- {{ item.player1.name }} ({{ item.player1.doubles }}) [{{ item.player1.team }}] -->
                      {{ item.player1.name }}
                    </td>
                    <td>
                      {{ item.player2.name }} ({{ item.player2.doubles }}) [{{ item.player2.team }}]
                    </td>
                    <td>{{ item.points }}</td>
                    <td>{{ item.doubles }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { filterPairsAndCalcDoubles } from '@/helper/pairs/filterPairsAndCalcDoubles'
import { generateUniquePairs } from '@/helper/pairs/generateUniquePairshelper'
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper'
import type Player from '@/models/Player'
import type Pair from '@/models/pairs/Pair'
import { computed, onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const searchTable = ref<string>('')
const searchPairs = ref<string>('')
const mainTeam = ref<Pair>()

const tableHeaders = ref([
  {
    title: 'Player 1',
    align: 'start',
    sortable: true,
    key: 'player1'
  },
  {
    title: 'Player 2',
    sortable: true,
    key: 'player2'
  },
  {
    title: 'Sum',
    sortable: true,
    key: 'points'
  },
  {
    title: 'Doubles',
    sortable: true,
    key: 'doubles'
  }
] as const)

onMounted(() => {
  defaultItemsPerPage()
})

const props = defineProps<{
  playersList: Player[]
}>()

const players = computed<Player[]>(() => {
  if (props.playersList) {
    return props.playersList
  }
  // Implemented for old version
  return getPlayersFromSessionStorage()
})

const allPairs = computed<Pair[]>(() => {
  return generateUniquePairs(players.value)
})

const possiblePairs = computed<Pair[]>(() => {
  return filterPairsAndCalcDoubles(filteredPairs.value, mainTeam.value)
})

const filteredPairs = ref<Pair[]>(filterPairs(allPairs.value))

watch(allPairs, () => {
  filteredPairs.value = filterPairs(allPairs.value, mainTeam.value)
  if (mainTeam.value) {
    const player1 = mainTeam.value.player1
    const player2 = mainTeam.value.player2
    // if (player in mainteam is missing in allPairs) then mainTeam.value = undefined
    if (
      !(
        players.value.some((player) => player.id === player1.id) &&
        players.value.some((player) => player.id === player2.id)
      )
    ) {
      mainTeam.value = undefined
    }
  }
})

function onClick(team: Pair) {
  mainTeam.value = team
}

watch(mainTeam, () => {
  filteredPairs.value = filterPairs(allPairs.value, mainTeam.value)
})

function filterPairs(allPairs: Pair[], team?: Pair): Pair[] {
  let filtered: Pair[] = allPairs
  if (team) {
    filtered = allPairs.filter(
      (pair) =>
        pair.player1.id !== team.player1.id &&
        pair.player2.id !== team.player1.id &&
        pair.player1.id !== team.player2.id &&
        pair.player2.id !== team.player2.id
    )
  }
  return filtered
}

const itemsPerPage = ref<number>()

function defaultItemsPerPage() {
  if (mobile.value === true) {
    return (itemsPerPage.value = 2)
  } else {
    return (itemsPerPage.value = 6)
  }
}

function onClickSeeAll() {
  if (mobile.value) {
    itemsPerPage.value = itemsPerPage.value === 2 ? allPairs.value.length : 2
  } else {
    itemsPerPage.value = itemsPerPage.value === 6 ? allPairs.value.length : 6
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
