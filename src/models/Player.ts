import type { TeamEnum } from './TeamEnum';

export default interface Player {
  id: number;
  name: string;
  singles: string;
  doubles: string;
  team: TeamEnum;
  isInSimulator: boolean;
  isEditing?: boolean;
}
