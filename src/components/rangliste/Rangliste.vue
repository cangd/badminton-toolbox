<template>
  <div class="rangliste__table">
    Table of players:
    <ul class="rangliste__row" v-for="player in players" :key="player.singles">
      <li class="rangliste__cell">
        {{ player.name }}
      </li>
      <li class="rangliste__cell">
        {{ player.singles }}
      </li>
      <li class="rangliste__cell">
        {{ player.doubles }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type Player from '@/models/Player.js'

const props = defineProps<{
  players: Player[]
}>()

</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .rangliste {
    &__table {
      display: table;
      width: 100%;
      border-collapse: collapse;
    }

    &__row {
      display: table-row;
    }

    &__cell {
      display: table-cell;
      border: 1px solid #000;
      padding: 8px;
    }
  }
}
</style>
