<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-hand-wave-outline"></v-icon>
    </template>
    <template #heading>Willkommen zur Badminton Toolbox</template>
    Die Seite ist leider noch nicht mobil freundlich. Im Browser erlebst Du die Tools viel besser :)
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-clipboard-account-outline"></v-icon>
    </template>
    <template #heading><RouterLink to="/rangliste">Rangliste</RouterLink></template>

    In der Rangliste können derzeit Spieler*innen erstellt und bearbeitet werden.
    <br />
    Der Name, eine Einzel- und Doppelwertung sowie die Mannschaft kann eingetragen werden.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-table-account"></v-icon>
    </template>
    <template #heading><RouterLink to="/calc">Simulator</RouterLink></template>

    Im Simulator wählt man ein Team aus, das definitiv im Doppel aufgestellt wird.
    <br />
    Alle übriggebliebene Paare werden mit "Wertung" und "Doppel" (HD1 oder HD2) angezeigt
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>
    Anregungen, Featurewünsche, Verbesserungsvorschläge sind herzlich willkommen und dürfen mir
    persönlich mitgeteilt oder auf
    <a href="https://github.com/cangd/badminton-toolbox/issues">GitHub</a> geposted werden.
    <br />
    Weitere Ideen, wie Filter, PDF export und weitere stehen auf der Liste.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support</template>

    In dem ihr das Tool benutzt und mir Feedback gebt!
    <br />
    Die Seite befindet sich im Entwicklungszustand. Bugs sind nicht auszuschließen.
  </WelcomeItem>
</template>
