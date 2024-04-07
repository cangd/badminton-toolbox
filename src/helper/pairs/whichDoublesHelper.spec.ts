import { describe, expect, it } from 'vitest'
import { whichDoubles } from './whichDoublesHelper.js'
import type Pair from '@/models/pairs/Pair.js'
import { player1, player2, player3, player4 } from '../testData/players.js'

describe('whichDoubles', () => {
  it('calculates HD2 for the calculateTeam', () => {
    const selectedMainTeam: Pair = {
      teamId: 1,
      player1,
      player2,
      points: 50
    }
    const calculateForTeam: Pair = {
      teamId: 2,
      player1: player3,
      player2: player4,
      points: 90
    }

    const doubles = whichDoubles(selectedMainTeam, calculateForTeam)

    expect(doubles).toBe('HD2')
  })
  it('calculates HD1 for the calculateTeam', () => {
    const selectedMainTeam: Pair = {
      teamId: 2,
      player1: player3,
      player2: player4,
      points: 90
    }

    const calculateForTeam: Pair = {
      teamId: 1,
      player1,
      player2,
      points: 50
    }

    const doubles = whichDoubles(selectedMainTeam, calculateForTeam)

    expect(doubles).toBe('HD1')
  })
  it('calculates HD1 for the calculateTeam when points are identical and the team has the better doubles player', () => {
    const selectedMainTeam: Pair = {
      teamId: 2,
      player1: player2,
      player2: player3,
      points: 70
    }
    const calculateForTeam: Pair = {
      teamId: 1,
      player1,
      player2: player4,
      points: 70
    }

    const doubles = whichDoubles(selectedMainTeam, calculateForTeam)

    expect(doubles).toBe('HD1')
  })
  it('calculates HD2 for the calculateTeam when points are identical and the team has not the better doubles player', () => {
    const selectedMainTeam: Pair = {
      teamId: 1,
      player1,
      player2: player4,
      points: 70
    }
    const calculateForTeam: Pair = {
      teamId: 2,
      player1: player2,
      player2: player3,
      points: 70
    }

    const doubles = whichDoubles(selectedMainTeam, calculateForTeam)

    expect(doubles).toBe('HD2')
  })
})
