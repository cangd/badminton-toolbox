import type Player from './Player'

export default interface Pair {
  teamId: number
  player1: Player
  player2: Player
  selected?: boolean | false
}
