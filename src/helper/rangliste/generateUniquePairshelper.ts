import type Player from '@/models/Player'
import type Pair from '../../models/Pair'

export function generateUniquePairs(players: Player[]): Pair[] {
  let pair: Pair
  const pairs: Pair[] = []

  for (let i = 0; i < players.length - 1; i++) {
    for (let j = i + 1; j < players.length; j++) {
      pair = { teamId: i, player1: players[i], player2: players[j] }
      pairs.push(pair)
    }
  }

  return pairs
}
