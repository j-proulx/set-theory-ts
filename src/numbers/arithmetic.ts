import { SET } from '..';
import { Successor } from './natural';

export type Add<A extends SET, B extends SET> = A extends []
  ? B
  : A extends [infer _, ...infer Tail extends SET[]]
    ? Add<Tail, Successor<B>>
    : never;
