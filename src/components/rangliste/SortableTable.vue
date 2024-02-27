<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key" @click="sortBy(column.key)">
          {{ column.label }}
          <span v-if="sortColumn === column.key">
            {{ sortDirection === 'asc' ? '▲' : '▼' }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in sortedData" :key="index">
        <td v-for="(column, key) in columns" :key="key">{{ item[column.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type Player from '@/models/Player';
import { ref, computed } from 'vue';

const props = defineProps<{
  players: Player[]
}>()


interface TableColumn {
  key: string;
  label: string;
}

interface TableRow {
  [key: string]: string | number;
}

const columns = ref<TableColumn[]>([
  { key: 'name', label: 'Name' },
  { key: 'singles', label: 'Singles' },
  { key: 'doubles', label: 'Doubles' }
]);

const data = ref<TableRow[]>([
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Jane', age: 25, city: 'Los Angeles' },
  { name: 'Doe', age: 40, city: 'Chicago' }
]);

const defaultPlayers = ref<Player[]>([
{ name: 'Hypeboy', singles: '10', doubles: '10' },
  { name: 'Cang', singles: '180', doubles: '180' },
  { name: 'Anton', singles: '150', doubles: '100' },
  { name: 'Brecher', singles: '160', doubles: '110' },
  { name: 'Richtiger Otto', singles: '30000', doubles: '30000' }
]);


const sortColumn = ref<string>('doubles');
const sortDirection = ref<'asc' | 'desc'>('asc');

const sortedData = computed<Player[]>(() => {
  if (!sortColumn.value) return defaultPlayers.value;

  return defaultPlayers.value.slice().sort((a, b) => {
    const aValue = a[sortColumn.value] as string | number;
    const bValue = b[sortColumn.value] as string | number;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection.value === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    // If not strings, sort as numbers
	if (typeof aValue === 'number' && typeof bValue === 'number') {
	return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue;
	}
  });
});

const sortBy = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortDirection.value = 'asc';
  }
};
</script>
