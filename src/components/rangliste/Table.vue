<template>
  <h1>Table</h1>
  <div class="table-header">
    <div class="table-header__item" v-for="item in headerItems" :key="item">
    <p>{{  item.toUpperCase() }}</p>
    <button @click="sortData(item, 'ASC')">Asc</button>
    <button @click="sortData(item, 'DESC')">Desc</button>
  </div>
  </div>
  <div class="table-row" v-for="(player, index) in shallowRows" :key="index">
    <div class="table-column__item" v-for="column in Object.values(player)">{{ column }}</div>
  </div>
</template>

<script setup lang="ts">
import type Player from '@/models/Player';
import { ref, computed } from 'vue';
import AddPlayer from './AddPlayer.vue';

const props = defineProps<{
  players: Player[]
}>()

const shallowRows = ref([ ...props.players])

const headerItems = computed(() => ['name', 'singles', 'doubles'])

// TODO https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

const sortData = (sortBy: string | number, direction: string) => {
  switch (sortBy) {
    case 'name': 
    shallowRows.value = shallowRows.value.sort((a,b) => {
      return (direction === 'ASC' ? a : b)[sortBy].localeCompare((direction === 'ASC' ? b : a)[sortBy])
    })  
    break
    
    default : 
    shallowRows.value = shallowRows.value.sort((a,b) => {
      return (direction === 'ASC' ? a : b)[sortBy] - (direction === 'ASC' ? b : a)[sortBy]
    })
    break
  }
}

</script>

<style lang="scss" scoped>
.table-row, .table-header {
  display: flex;
  flex-wrap: nowrap;
}

.table-header__item,
.table-column__item {
  width: 25%;
  border: solid 1px #4d4d4d;
  padding: 8px 16px;
  box-sizing: border-box;
}
</style>