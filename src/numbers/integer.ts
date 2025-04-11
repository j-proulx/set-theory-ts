import { SET, Union } from '..';

export type KuratowskiPair<A extends SET, B extends SET> = Union<
  [[A]],
  [Union<[A], [B]>]
>;
