import type Player from '@/models/Player';
import type Pair from '@/models/pairs/Pair';

export function findTeamIdForPlayer(
  findPlayer: Player,
  mainTeam: Pair,
  teamToCompare: Pair
): number {
  let pairs: Pair[] = [];
  let teamId: number = 0;

  pairs.push(mainTeam, teamToCompare);

  for (const pair of pairs) {
    if (pair.player1.name === findPlayer.name || pair.player2.name === findPlayer.name) {
      teamId = pair.teamId;
    }
  }

  if (teamId > 0) {
    return teamId;
  }

  console.error('No matching team found');
  throw 'No TeamId found';
}
