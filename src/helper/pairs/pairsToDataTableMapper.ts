import type DataTablePair from '@/models/pairs/DataTablePair'
import type Pair from '@/models/pairs/Pair'
import { whichDoubles } from './whichDoublesHelper'

export function pairsToDataTableMapper(pairs: Pair[], mainTeam?: Pair): DataTablePair[] {
  const dataTablePairs: DataTablePair[] = []
  for (let pair of pairs) {
    const sum = parseInt(pair.player1.doubles) + parseInt(pair.player2.doubles)
    pair.points = sum
    const doppel = mainTeam ? whichDoubles(mainTeam, pair) : ''
    const dataTablePair: DataTablePair = {
      player1: `${pair.player1.name} (${pair.player1.doubles}) [${pair.player1.team}]`,
      player2: `${pair.player2.name} (${pair.player2.doubles}) [${pair.player2.team}]`,
      sum,
      doppel
    }
    dataTablePairs.push(dataTablePair)
  }

  return dataTablePairs
}
