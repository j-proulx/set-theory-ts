import { Equal, SET, Union } from '..';
import { Add } from './arithmetic';

export type KuratowskiPair<A extends SET, B extends SET> = Union<
  [[A]],
  [Union<[A], [B]>]
>;

export type Integer<A extends SET, B extends SET> = KuratowskiPair<A, B>;

export type FirstOf<P extends SET[]> = P extends [
  [infer X extends SET],
  ...any[],
]
  ? X
  : never;

export type SecondOf<P extends SET[]> = P extends [
  [unknown],
  [any, infer Y extends SET],
]
  ? Y
  : FirstOf<P>;

export type EqualInteger<A extends SET[], B extends SET[]> = Equal<
  Add<FirstOf<A>, SecondOf<B>>,
  Add<FirstOf<B>, SecondOf<A>>
>;
