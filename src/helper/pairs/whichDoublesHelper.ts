import type Pair from '@/models/pairs/Pair'
import { findDoublesWithSamePoints } from './findDoublesWithSamePoints'

export function whichDoubles(mainTeam: Pair, teamToCompare: Pair): 'HD1' | 'HD2' {
  if (mainTeam.points === teamToCompare.points) {
    return findDoublesWithSamePoints(mainTeam, teamToCompare)
  }
  if (mainTeam.points < teamToCompare.points) {
    return 'HD2'
  } else {
    return 'HD1'
  }
}
