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
                :items="flatPairs"
                :items-per-page="itemsPerPage"
                :search="searchPairs"
              >
                <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
                  <v-row class="d-md-flex justify-md-end justify-xs-center flex-sm-row">
                    <v-col cols="12" md="3">
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
                  <v-item-group selected-class="bg-primary">
                    <v-container>
                      <v-row>
                        <v-col v-for="(item, i) in items" :key="i" cols="12" lg="4" sm="6">
                          <v-item v-slot="{ isSelected, selectedClass, toggle }">
                            <v-card
                              :class="['d-flex align-center', selectedClass]"
                              height="100"
                              dark
                              v-on:click="toggle"
                              @click="onClick(item.raw)"
                            >
                              <div class="text-subtitle-1 flex-grow-1 text-center css-fix">
                                {{
                                  isSelected
                                    ? `${item.raw.p1} \n ${item.raw.p2} \n Sum: (${item.raw.sumPoints})`
                                    : `${item.raw.p1} \n ${item.raw.p2}`
                                }}
                              </div>
                            </v-card>
                          </v-item>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-item-group>
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
                :items="possiblePairs"
                :search="searchTable"
                :items-per-page="5"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { generateUniquePairs } from '@/helper/pairs/generateUniquePairshelper';
import { pairsToDataTableMapper } from '@/helper/pairs/pairsToDataTableMapper';
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper';
import type Player from '@/models/Player';
import type DataTablePair from '@/models/pairs/DataTablePair';
import type FlatPair from '@/models/pairs/FlatPair';
import type Pair from '@/models/pairs/Pair';
import { computed, onMounted, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const searchTable = ref<string>('');
const searchPairs = ref<string>('');
const mainTeam = ref<Pair>();

onMounted(() => {
  defaultItemsPerPage();
});

const props = defineProps<{
  playersList: Player[];
}>();

const players = computed<Player[]>(() => {
  if (props.playersList) {
    return props.playersList;
  }
  // Implemented for old version
  return getPlayersFromSessionStorage();
});

const allPairs = computed<Pair[]>(() => {
  return generateUniquePairs(players.value);
});

const flatPairs = computed<FlatPair[]>(() => {
  return flattenPairs(allPairs.value);
});

const possiblePairs = computed<DataTablePair[]>(() => {
  return pairsToDataTableMapper(filteredPairs.value, mainTeam.value);
});

const filteredPairs = ref<Pair[]>(filterPairs(allPairs.value));

watch(allPairs, () => {
  filteredPairs.value = filterPairs(allPairs.value, mainTeam.value);
  if (mainTeam.value) {
    const player1 = mainTeam.value.player1;
    const player2 = mainTeam.value.player2;
    // if (player in mainteam is missing in allPairs) then mainTeam.value = undefined
    if (
      !(
        players.value.some((player) => player.id === player1.id) &&
        players.value.some((player) => player.id === player2.id)
      )
    ) {
      mainTeam.value = undefined;
    }
  }
});

function onClick(team: FlatPair) {
  mainTeam.value = mapFlatPairToPair(team);
}

watch(mainTeam, () => {
  filteredPairs.value = filterPairs(allPairs.value, mainTeam.value);
});

function filterPairs(allPairs: Pair[], team?: Pair): Pair[] {
  let filtered: Pair[] = allPairs;
  if (team) {
    filtered = allPairs.filter(
      (pair) =>
        pair.player1.id !== team.player1.id &&
        pair.player2.id !== team.player1.id &&
        pair.player1.id !== team.player2.id &&
        pair.player2.id !== team.player2.id
    );
  }
  return filtered;
}

const itemsPerPage = ref<number>();

function defaultItemsPerPage() {
  if (mobile.value === true) {
    return (itemsPerPage.value = 2);
  } else {
    return (itemsPerPage.value = 6);
  }
}

function onClickSeeAll() {
  if (mobile.value) {
    itemsPerPage.value = itemsPerPage.value === 2 ? allPairs.value.length : 2;
  } else {
    itemsPerPage.value = itemsPerPage.value === 6 ? allPairs.value.length : 6;
  }
}

function flattenPairs(pairs: Pair[]): FlatPair[] {
  let flatPairs = [];
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
    };
    flatPairs.push(flatPair);
  }
  return flatPairs;
}

function mapFlatPairToPair(team: FlatPair): Pair {
  return {
    teamId: team.teamId,
    player1: team.player1,
    player2: team.player2,
    points: team.sumPoints
  };
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

.css-fix {
  white-space: pre-wrap;
}
</style>
