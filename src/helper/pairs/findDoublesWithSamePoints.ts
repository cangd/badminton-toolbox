import type Pair from '@/models/pairs/Pair'
import { findTeamIdForPlayer } from './findTeamIdForPlayer'

export function findDoublesWithSamePoints(mainTeam: Pair, teamToCompare: Pair): 'HD1' | 'HD2' {
  const players = []
  players.push(mainTeam.player1, mainTeam.player2, teamToCompare.player1, teamToCompare.player2)

  const playerWithBestRating = players.reduce((minPlayer, currentPlayer) => {
    const minRating = parseInt(minPlayer.doubles)
    const currentRating = parseInt(currentPlayer.doubles)
    return currentRating < minRating ? currentPlayer : minPlayer
  }, players[0])

  if (findTeamIdForPlayer(playerWithBestRating, mainTeam, teamToCompare) == teamToCompare.teamId) {
    return 'HD1'
  } else return 'HD2'
}
