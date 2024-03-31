<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="teamDropdown">
    <v-select
      class="teamDropdown_select"
      :items="items"
      :disabled="isDisabled"
      v-model="selectedTeam"
      hide-details
    >
    </v-select>
  </div>
</template>

<script setup lang="ts">
import { TeamEnum } from '@/models/TeamEnum'
import { computed, ref } from 'vue'

const props = defineProps<{
  isDisabled?: boolean
  teamZugehoerigkeit: TeamEnum
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: TeamEnum): void }>()

const items = ref([TeamEnum.M1, TeamEnum.M2, TeamEnum.M3, TeamEnum.M4, TeamEnum.E])

const selectedTeam = computed({
  get: () => props.teamZugehoerigkeit,
  set: (value: TeamEnum) => {
    emit('update:modelValue', value)
  }
})
</script>

<style lang="scss" scoped>
.teamDropdown {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-select {
  width: 125px;
}
</style>
