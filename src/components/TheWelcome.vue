<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-hand-wave-outline" />
    </template>
    <template #heading>Willkommen zur Badminton Toolbox</template>
    Mit der Zeit kommt das eine oder andere Tool, das für die Saison(-vorbereitung) nützlich sein
    könnte.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-new-box" />
    </template>
    <template #heading>Neue Features:</template>

    <li>05.04.2024: Mobile Friendly design</li>
    <li>03.04.2024: Die Toolbox geht online</li>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-clipboard-account-outline" />
    </template>
    <template #heading><RouterLink to="/rangliste">Rangliste</RouterLink></template>

    In der Rangliste können derzeit Spieler*innen erstellt und bearbeitet werden.
    <br />
    Die Daten werden in eurem Browser gespeichert. Ihr seht also nur eure persönliche Rangliste.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-table-account" />
    </template>
    <template #heading><RouterLink to="/doppelrechner">Doppelrechner</RouterLink></template>

    Im Doppelrechner wählt man ein Team aus, das definitiv im Doppel aufgestellt wird.
    <br />
    Alle übriggebliebene Paare werden mit "Wertung" und "Doppel" (HD1 oder HD2) angezeigt
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-map-marker" />
    </template>
    <template #heading>Roadmap</template>

    <li>Filter Funktion für Spieler, die in den Simulator übertragen werden sollen</li>
    <li>Integrierte Ansicht</li>
    <li>PDF export</li>
    <li>PDF import</li>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>
    Anregungen, Featurewünsche, Verbesserungsvorschläge sind herzlich willkommen und dürfen mir
    persönlich mitgeteilt oder auf
    <a href="https://github.com/cangd/badminton-toolbox/issues">GitHub</a> geposted werden.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support</template>

    Verwendet die Tools und gebt mir Feedback!
    <br />
    Die Seite befindet sich im Entwicklungszustand. Bugs sind nicht auszuschließen.
  </WelcomeItem>
</template>
