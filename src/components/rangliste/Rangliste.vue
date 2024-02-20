<template>
  <div class="rangliste__table">
    Table of players:
    <ul class="rangliste__row">
      <li class="rangliste__head">Name</li>
      <li class="rangliste__head">Singles</li>
      <li class="rangliste__head">Doubles</li>
    </ul>
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

    &__cell, &__head {
      display: table-cell;
      border: 1px solid #000;
      padding: 8px;
    }

    &__head {
      font-size: larger;
      font-style: italic;
    }
  }
}
</style>
