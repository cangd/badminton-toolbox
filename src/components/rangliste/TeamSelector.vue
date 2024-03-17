<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="teamDropdown">
    <select class="teamDropdown_select" name="team" :disabled="isDisabled" v-model="selectedTeam">
      <option
        class="teamDropdown_select--option"
        :class="'teamDropdown_select--option-' + option.value"
        v-for="option in options"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
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

const options = ref([
  { text: TeamEnum.M1, value: TeamEnum.M1 },
  { text: TeamEnum.M2, value: TeamEnum.M2 },
  { text: TeamEnum.M3, value: TeamEnum.M3 },
  { text: TeamEnum.M4, value: TeamEnum.M4 },
  { text: TeamEnum.E, value: TeamEnum.E }
])

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
  align-content: center;
}
</style>
