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
    Erste nette Tools sind schon geschrieben worden. Es kommt bestimmt das eine oder andere Tool
    dazu!
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

    Mit Hilfe dieses Tools werden alle Paarungen aus der erstellten Rangliste simuliert.
    <br />
    Hier zu wählt man ein Team aus, das definitiv ein Doppel aufgestellt wird.
    <br />
    Alle übriggebliebene Paare werden mit "Wertung" und "Doppel" (HD1/HD2) angezeigt
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>
    Alles was hier entwickelt wurde befindet sich noch im Entwicklungszustand, habt bitte Nachsicht.
    <br />
    Weitere Ideen, wie Filter, PDF export und import stehen auf der Liste.
    <br />
    Ob sie es hier her schaffen, werden wir sehen ;)
    <br />
    Falls ihr Anregungen, Featurewünsche, Verbesserungsvorschläge habt, dürfen diese
    <a href="https://github.com/cangd/badminton-toolbox/issues">hier</a> geposted werden.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Supported mich</template>

    In dem ihr das Tool benutzt und mir Feedback gebt!
  </WelcomeItem>
</template>
