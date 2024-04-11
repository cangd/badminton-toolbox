<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="hideBar">
    <v-row class="flex-row justify-end">
      <v-col cols="12" sm="3">
        <v-switch
          v-model="showAddPlayer"
          color="teal-lighten-2"
          label="Spieler hinzufügen"
        ></v-switch>
      </v-col>
      <v-col cols="12" sm="2">
        <v-switch v-model="showTable" color="teal-lighten-2" label="Rangliste"></v-switch>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  displayTable: boolean;
  displayAddPlayer: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:displayTable', value: boolean): void;
  (e: 'update:displayAddPlayer', value: boolean): void;
}>();

const showTable = computed({
  get: () => props.displayTable,
  set: (value: boolean) => {
    emit('update:displayTable', value);
  }
});

const showAddPlayer = computed({
  get: () => props.displayAddPlayer,
  set: (value: boolean) => {
    emit('update:displayAddPlayer', value);
  }
});
</script>

<style lang="scss" scoped></style>
