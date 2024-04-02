import type Pair from '@/models/pairs/Pair'
import { findPlayerInTeam } from './findPlayerInTeamHelper'

export function findTeamWithLowestDoubleRating(mainTeam: Pair, comparingTeam: Pair): string {
  const pairs = []
  const players = []
  pairs.push(mainTeam, comparingTeam)
  players.push(mainTeam.player1, mainTeam.player2, comparingTeam.player1, comparingTeam.player2)

  const playerWithLowestRating = players.reduce((minPlayer, currentPlayer) => {
    const minRating = parseInt(minPlayer.doubles)
    const currentRating = parseInt(currentPlayer.doubles)
    return currentRating < minRating ? currentPlayer : minPlayer
  }, players[0])

  if (findPlayerInTeam(playerWithLowestRating, pairs) == comparingTeam.teamId) {
    return 'HD1'
  } else return 'HD2'
}
