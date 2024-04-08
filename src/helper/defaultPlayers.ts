import type Player from '@/models/Player'
import { TeamEnum } from '@/models/TeamEnum'

export const defaultPlayers: Player[] = [
  { id: 1, name: 'Anton', singles: '10', doubles: '30', team: TeamEnum.M1, isInSimulator: false },
  { id: 2, name: 'Berta', singles: '20', doubles: '10', team: TeamEnum.M1, isInSimulator: false },
  { id: 3, name: 'Caeser', singles: '30', doubles: '20', team: TeamEnum.M1, isInSimulator: false },
  { id: 4, name: 'Dora', singles: '40', doubles: '40', team: TeamEnum.M1, isInSimulator: false },
  { id: 5, name: 'Emil', singles: '50', doubles: '50', team: TeamEnum.M2, isInSimulator: false }
]
