
export interface Problem {
  id: string;
  text: string;
  completed: boolean;
}

export enum QuadrantId {
  GladToHave = 'GLAD_TO_HAVE',
  WishIDidnt = 'WISH_I_DIDNT',
  Tiny = 'TINY',
  CantControl = 'CANT_CONTROL',
}

export type ProblemsState = Record<QuadrantId, Problem[]>;
