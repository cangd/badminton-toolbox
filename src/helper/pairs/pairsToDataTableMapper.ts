import type DataTablePair from '@/models/pairs/DataTablePair'
import type Pair from '@/models/pairs/Pair'
import { whichDoubles } from './whichDoublesHelper'

export function pairsToDataTableMapper(pairs: Pair[], mainTeam?: Pair): DataTablePair[] {
  const dataTablePairs: DataTablePair[] = []
  for (const pair of pairs) {
    let doppel = undefined
    if (mainTeam) {
      doppel = whichDoubles(mainTeam, pair)
    }

    const dataTablePair: DataTablePair = {
      player1: `${pair.player1.name} (${pair.player1.doubles}) [${pair.player1.team}]`,
      player2: `${pair.player2.name} (${pair.player2.doubles}) [${pair.player2.team}]`,
      sum: pair.points,
      doppel
    }
    dataTablePairs.push(dataTablePair)
  }

  return dataTablePairs
}
