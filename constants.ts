
import { QuadrantId } from './types';

export const QUADRANT_CONFIG: Record<QuadrantId, { title: string; color: string; }> = {
  [QuadrantId.GladToHave]: {
    title: "I'm glad to have these problems",
    color: 'border-emerald-500',
  },
  [QuadrantId.WishIDidnt]: {
    title: "Wish I didn't have these problems",
    color: 'border-amber-500',
  },
  [QuadrantId.Tiny]: {
    title: 'Tiny problems',
    color: 'border-sky-500',
  },
  [QuadrantId.CantControl]: {
    title: "Problems I can't control",
    color: 'border-violet-500',
  },
};

export const ENCOURAGING_MESSAGES: string[] = [
  "This too shall pass.",
  "Worrying is like paying a debt you don't owe.",
  "Some problems are not meant to be solved, but outgrown.",
  "The first step to solving a problem is to recognize that it does exist.",
  "Control what you can, and let go of what you cannot.",
  "Every problem is a gift—without problems we would not grow.",
  "Peace is not the absence of problems, but the ability to deal with them.",
  "You are stronger than you think.",
  "One day at a time.",
  "Progress, not perfection.",
  "Remember that some problems are just never meant to be solved.",
  "The oak fought the wind and was broken, the willow bent when it must and survived."
];
