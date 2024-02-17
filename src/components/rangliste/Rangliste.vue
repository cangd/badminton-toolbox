<template>
  <div class="rangliste__table">
    <div>
      <ul>
        Table of players:
        <li v-for="player in players" :key="player.singles">
          {{ player.name }} ({{ player.singles }} / {{ player.doubles }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type Player from '@/models/Player.js'

defineProps<{
  players: Player[]
}>()

// Todo Order Table


</script>

<style>
@media (min-width: 1024px) {
  ul {
    list-style-type: none;
  }
}
</style>
