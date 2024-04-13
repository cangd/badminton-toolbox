<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="hideBar">
    <v-row class="justify-end">
      <v-col cols="12" md="3" sm="4" xs="1">
        <v-switch
          class="hideBar_showAddPlayer"
          v-model="showAddPlayer"
          color="teal-lighten-2"
          label="Spieler hinzufügen"
        ></v-switch>
      </v-col>
      <v-col cols="12" md="2" sm="3" xs="1">
        <v-switch
          class="hideBar_showTable"
          v-model="showTable"
          color="teal-lighten-2"
          label="Rangliste"
        ></v-switch>
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

<style lang="scss" scoped>
.hideBar_showTable {
  height: 30px;
}

.hideBar_showAddPlayer {
  height: 30px;
}
</style>
