<template>
  <v-tooltip text="Download Rangliste">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        size="large"
        class="addPlayer__button"
        icon="mdi-download"
        variant="tonal"
        @click="generatePdf"
        id="button"
        density="comfortable"
        color="teal-lighten-2"
      >
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { getPlayersFromSessionStorage } from '@/helper/rangliste/playersStorageHelper';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePdf = () => {
  const players = getPlayersFromSessionStorage();
  const docDefinition: any = {
    content: [
      { text: 'Vereinsrangliste VfB Hermsdorf', style: 'header' },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*'],
          body: [
            ['Name', 'Einzel', 'Doppel', 'Mannschaft'],
            ...players.map((player) => [player.name, player.singles, player.doubles, player.team])
          ]
        }
      }
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
    }
  };
  pdfMake.createPdf(docDefinition).download('vereinsrangliste.pdf');
};
</script>
