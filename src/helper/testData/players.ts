import type Player from '@/models/Player'
import { TeamEnum } from '@/models/TeamEnum'

export const player1: Player = {
  id: 1,
  name: 'Anton',
  singles: '10',
  doubles: '20',
  team: TeamEnum.M1
}

export const player2: Player = {
  id: 2,
  name: 'Berta',
  singles: '20',
  doubles: '30',

  team: TeamEnum.M1
}

export const player3: Player = {
  id: 3,
  name: 'Caeser',
  singles: '30',
  doubles: '40',
  team: TeamEnum.M1
}

export const player4: Player = {
  id: 4,
  name: 'Dota',
  singles: '40',
  doubles: '50',
  team: TeamEnum.M1
}
