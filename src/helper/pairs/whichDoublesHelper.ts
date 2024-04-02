import type Pair from '@/models/pairs/Pair'
import { findTeamWithLowestDoubleRating } from './findTeamWithLowestDoubleRatingHelper'

export function whichDoubles(mainTeam: Pair, comparingTeam: Pair): string {
  if (mainTeam) {
    if (mainTeam.points === comparingTeam.points) {
      return findTeamWithLowestDoubleRating(mainTeam, comparingTeam)
    }
    if (mainTeam.points < comparingTeam.points) {
      return 'HD2'
    } else {
      return 'HD1'
    }
  }
  console.error('No mainTeam found')
  throw 'SumTingWong'
}
