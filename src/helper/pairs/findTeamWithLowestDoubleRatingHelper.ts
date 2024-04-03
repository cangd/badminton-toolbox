import type Pair from '@/models/pairs/Pair'
import { findPlayerInTeam } from './findPlayerInTeamHelper'

export function findTeamWithLowestDoubleRating(
  selectedMainTeam: Pair,
  calculateForTeam: Pair
): string {
  const pairs = []
  const players = []
  pairs.push(selectedMainTeam, calculateForTeam)
  players.push(
    selectedMainTeam.player1,
    selectedMainTeam.player2,
    calculateForTeam.player1,
    calculateForTeam.player2
  )

  const playerWithLowestRating = players.reduce((minPlayer, currentPlayer) => {
    const minRating = parseInt(minPlayer.doubles)
    const currentRating = parseInt(currentPlayer.doubles)
    return currentRating < minRating ? currentPlayer : minPlayer
  }, players[0])

  if (findPlayerInTeam(playerWithLowestRating, pairs) == calculateForTeam.teamId) {
    return 'HD1'
  } else return 'HD2'
}
