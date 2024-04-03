import type Pair from '@/models/pairs/Pair'
import { findTeamWithLowestDoubleRating } from './findTeamWithLowestDoubleRatingHelper'

export function whichDoubles(selectedMainTeam: Pair, calculateForTeam: Pair): string {
  if (selectedMainTeam) {
    if (selectedMainTeam.points === calculateForTeam.points) {
      return findTeamWithLowestDoubleRating(selectedMainTeam, calculateForTeam)
    }
    if (selectedMainTeam.points < calculateForTeam.points) {
      return 'HD2'
    } else {
      return 'HD1'
    }
  }
  console.error('No mainTeam found')
  throw 'SumTingWong'
}
