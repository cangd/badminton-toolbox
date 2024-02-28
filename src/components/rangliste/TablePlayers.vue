<template>
  <div class="tablePlayers__table">
    Table of players:
    <ul class="tablePlayers__row">
      <li class="tablePlayers__head">Name</li>
      <li class="tablePlayers__head">Singles</li>
      <li class="tablePlayers__head">Doubles</li>
    </ul>
    <ul class="tablePlayers__row" v-for="player in players" :key="player.singles">
      <li class="tablePlayers__cell">
        {{ player.name }}
      </li>
      <li class="tablePlayers__cell">
        {{ player.singles }}
      </li>
      <li class="tablePlayers__cell">
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
  .tablePlayers {
    &__table {
      display: table;
      width: 100%;
      border-collapse: collapse;
    }

    &__row {
      display: table-row;
    }

    &__cell,
    &__head {
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
