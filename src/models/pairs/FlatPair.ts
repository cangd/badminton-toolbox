import type Player from '../Player';

export default interface FlatPair {
  p1: string;
  p2: string;
  p1Id: number;
  p2Id: number;
  player1: Player;
  player2: Player;
  sumPoints: number;
  teamId: number;
}
