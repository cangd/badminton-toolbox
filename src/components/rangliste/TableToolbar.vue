<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="tableToolbar">
    <v-row class="justify-end">
      <v-col cols="12" sm="6">
        <v-select
          theme="dark"
          v-model="selectedTeams"
          :items="items"
          label="Mannschaften"
          chips
          multiple
          closable-chips
          color="teal-lighten-2"
          base-color="teal-lighten-2"
        >
        </v-select>
      </v-col>
      <v-col class="justify-end" cols="12" sm="3">
        <v-switch v-model="showTable" color="teal-lighten-2" label="Rangliste"></v-switch>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { TeamEnum } from '@/models/TeamEnum'
import { computed, ref } from 'vue'

const props = defineProps<{
  teamFilter: TeamEnum[]
  displayTable: boolean
}>()

const emit = defineEmits<{
  (e: 'update:teamFilter', value: TeamEnum[]): void
  (e: 'update:displayTable', value: boolean): void
}>()

const items = ref([TeamEnum.M1, TeamEnum.M2, TeamEnum.M3, TeamEnum.M4, TeamEnum.E])

const selectedTeams = computed({
  get: () => props.teamFilter,
  set: (value: TeamEnum[]) => {
    emit('update:teamFilter', value)
  }
})

const showTable = computed({
  get: () => props.displayTable,
  set: (value: boolean) => {
    emit('update:displayTable', value)
  }
})
</script>

<style lang="scss" scoped>
.tableToolbar {
  margin: 20px;
}
</style>
