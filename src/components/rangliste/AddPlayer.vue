<template>
  <div>
    <div class="addPlayer">
      <v-row class="mt-4 flex-row justify-center">
        <v-col cols="12" md="4" sm="12" xs="4">
          <v-text-field
            id="name"
            class="addPlayer__name"
            v-model="newPlayerName"
            :class="{ addPlayer__error: hasNameError }"
            hide-details
            label="New Player"
            prepend-inner-icon="mdi-badminton"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="6" xs="1">
          <v-text-field
            id="singles"
            class="addPlayer__singles"
            v-model="newSinglesRating"
            :class="{ addPlayer__error: hasSinglesError }"
            hide-details
            label="Einzel"
            prepend-inner-icon="mdi-account"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="6" xs="1">
          <v-text-field
            id="doubles"
            class="addPlayer__doubles"
            v-model="newDoublesRating"
            :class="{ addPlayer__error: hasDoublesError }"
            hide-details
            label="Doppel"
            prepend-inner-icon="mdi-account-multiple"
          ></v-text-field>
        </v-col>
        <v-col class="dlex justify-center" cols="12" md="2" sm="6" xs="1">
          <TeamSelector
            class="addPlayer__team"
            v-model="newSelectedTeam"
            :isDisabled="false"
            :teamZugehoerigkeit="newSelectedTeam"
          >
          </TeamSelector>
        </v-col>

        <v-col class="d-flex align-center justify-center" cols="12" md="1" sm="6" xs="1">
          <v-tooltip :text="`${newPlayerName} hinzufügen`">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="addPlayer__button"
                icon="mdi-account-plus"
                variant="tonal"
                v-if="isFormFilledWithoutErrors()"
                @click="clickAdd"
                id="button"
                density="comfortable"
                color="teal-lighten-2"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getLastIdFromLocalStorage,
  saveLastIdToLocalStorage
} from '@/helper/rangliste/lastIdStoragehelper.js';
import { savePlayersToSessionStorage } from '@/helper/rangliste/playersStorageHelper';
import type Player from '@/models/Player.js';
import { TeamEnum } from '@/models/TeamEnum';
import { computed, ref } from 'vue';
import TeamSelector from './TeamSelector.vue';

const newPlayerName = ref('');
const newSinglesRating = ref('');
const newDoublesRating = ref('');
const newSelectedTeam = ref<TeamEnum>(TeamEnum.E);

const props = defineProps<{
  playersList: Player[];
}>();

const emit = defineEmits<{ (e: 'update:playersList', player: Player[]): void }>();

const players = computed<Player[]>({
  get: () => {
    return props.playersList;
  },
  set: (value: Player[]) => {
    emit('update:playersList', value);
  }
});

const hasNameError = computed(() => {
  if (!props.playersList) {
    return false; // or handle the case when players is undefined
  }
  return !players.value.every((p) => p.name !== newPlayerName.value);
});

const hasSinglesError = computed<boolean>(() => {
  if (!props.playersList) {
    return false; // or handle the case when players is undefined
  }
  return !players.value.every((p) => p.singles !== newSinglesRating.value);
});

const hasDoublesError = computed<boolean>(() => {
  if (!props.playersList) {
    return false; // or handle the case when players is undefined
  }
  1;
  return !players.value.every((p) => p.doubles !== newDoublesRating.value);
});

const isFormFilledWithoutErrors = ref(() => {
  return (
    !hasNameError.value &&
    !hasSinglesError.value &&
    !hasDoublesError.value &&
    newPlayerName.value &&
    newSinglesRating.value &&
    newDoublesRating.value
  );
});

function clickAdd(): void {
  const newId = createNewPlayerId();
  const newPlayer: Player = {
    id: newId,
    name: newPlayerName.value,
    singles: newSinglesRating.value,
    doubles: newDoublesRating.value,
    team: newSelectedTeam.value,
    isInSimulator: false
  };

  // Check if players.value is defined before using it
  if (players.value) {
    players.value.push(newPlayer);
    savePlayersToSessionStorage(players.value);
  } else {
    players.value = [newPlayer]; // Initialize players with the newPlayer if it's not defined
  }

  clearForm();
}

function createNewPlayerId(): number {
  const lastId: number = getLastIdFromLocalStorage() | 0;
  const newPlayerId: number = lastId + 1;
  saveLastIdToLocalStorage(newPlayerId);
  return newPlayerId;
}

function clearForm(): void {
  newPlayerName.value = '';
  newSinglesRating.value = '';
  newDoublesRating.value = '';
  newSelectedTeam.value = TeamEnum.E;
}
</script>

<style lang="scss" scoped>
.addPlayer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &__error {
    border: 3px solid red;
  }
}
</style>
