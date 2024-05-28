<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue';
import CommunityIcon from './icons/IconCommunity.vue';
import SupportIcon from './icons/IconSupport.vue';
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

    14.04.2024: Der PDF export online!
    <li>Die hier Rangliste kann nun als PDF exportiert werden!</li>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-clipboard-account-outline" />
    </template>
    <template #heading><RouterLink to="/simulator">Ranglisten-Tool</RouterLink></template>

    In der Rangliste können derzeit Spieler*innen erstellt und bearbeitet werden.
    <br />
    Die Daten werden in eurem Browser gespeichert. Ihr seht also nur eure persönliche Rangliste.
    <br />
    Spieler*innen können neuerdings für den Simulator ausgewählt werden.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="mdi-map-marker" />
    </template>
    <template #heading>Roadmap</template>

    <li>Mal sehen was als nächstes kommt :)</li>
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
