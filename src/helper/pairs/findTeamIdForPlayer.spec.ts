import type Pair from '@/models/pairs/Pair.js';
import { describe, expect, it } from 'vitest';
import { player1, player2, player3, player4 } from '../testData/players.js';
import { findTeamIdForPlayer } from './findTeamIdForPlayer.js';

const selectedMainTeam: Pair = {
  teamId: 1,
  player1,
  player2,
  points: 50
};
const calculateForTeam: Pair = {
  teamId: 2,
  player1: player3,
  player2: player4,
  points: 90
};

describe('findTeamIdForPlayer', () => {
  it('returns teamId when player is in selectedMainTeam', () => {
    const teamId = findTeamIdForPlayer(player1, selectedMainTeam, calculateForTeam);

    expect(teamId).toBe(1);
  });

  it('returns teamId when player is in calculateForTeam', () => {
    const teamId = findTeamIdForPlayer(player3, selectedMainTeam, calculateForTeam);

    expect(teamId).toBe(2);
  });
});
