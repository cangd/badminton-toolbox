import type Pair from '@/models/pairs/Pair'
import { whichDoubles } from './whichDoublesHelper'

export function filterPairsAndCalcDoubles(pairs: Pair[], mainTeam?: Pair): Pair[] {
  const newPairs: Pair[] = []
  for (const pair of pairs) {
    pair.doubles = mainTeam ? whichDoubles(mainTeam, pair) : ''
    newPairs.push(pair)
  }

  return newPairs
}
