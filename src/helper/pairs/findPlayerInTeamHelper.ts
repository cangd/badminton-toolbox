import type Player from '@/models/Player'
import type Pair from '@/models/pairs/Pair'

export function findPlayerInTeam(findPlayer: Player, pairs: Pair[]): number {
  let teamId: number = 0

  for (const pair of pairs) {
    if (pair.player1.name === findPlayer.name || pair.player2.name === findPlayer.name) {
      teamId = pair.teamId
    }
  }

  if (teamId > 0) {
    return teamId
  }

  console.error('No matching team found')
  throw 'No TeamId found'
}
