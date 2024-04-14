<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="tableToolbar">
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="5" xs="6">
        <v-select
          theme="dark"
          v-model="selectedTeams"
          :items="items"
          label="Filter nach Mannschaft"
          chips
          multiple
          closable-chips
          color="teal-lighten-2"
          base-color="teal-lighten-2"
        >
        </v-select>
      </v-col>
      <v-col class="mb-5" cols="12" sm="2" xs="1">
        <DownloadPdfButton />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { TeamEnum } from '@/models/TeamEnum';
import { computed, ref } from 'vue';
import DownloadPdfButton from './DownloadPdfButton.vue';

const props = defineProps<{
  teamFilter: TeamEnum[];
}>();

const emit = defineEmits<{
  (e: 'update:teamFilter', value: TeamEnum[]): void;
}>();

const items = ref([TeamEnum.M1, TeamEnum.M2, TeamEnum.M3, TeamEnum.M4, TeamEnum.E]);

const selectedTeams = computed({
  get: () => props.teamFilter,
  set: (value: TeamEnum[]) => {
    emit('update:teamFilter', value);
  }
});
</script>

<style lang="scss" scoped></style>
