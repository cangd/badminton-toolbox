import type Player from '@/models/Player';
import type Pair from '../../models/pairs/Pair';

export function generateUniquePairs(players: Player[]): Pair[] {
  let pair: Pair;
  let teamId: number = 0;
  let points: number;
  const pairs: Pair[] = [];

  for (let i = 0; i < players.length - 1; i++) {
    for (let j = i + 1; j < players.length; j++) {
      teamId++;
      points = parseInt(players[i].doubles) + parseInt(players[j].doubles);
      pair = {
        teamId,
        player1: players[i],
        player2: players[j],
        points
      };
      pairs.push(pair);
    }
  }

  return pairs;
}
