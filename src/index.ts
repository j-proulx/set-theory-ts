import { And, Or } from './normalize';

export type SET = [] | SET[];
export type EMPTY = [];

export type Member<E extends SET, S extends SET[]> = S extends [
  infer Head extends SET,
  ...infer Tail extends SET[],
]
  ? Or<Equal<Head, E>, Member<E, Tail>>
  : false;

export type Subset<A extends SET, B extends SET> = A extends []
  ? true
  : B extends SET[]
    ? A extends SET[]
      ? A extends [infer Head extends SET, ...infer Tail extends SET[]]
        ? And<Member<Head, B>, Subset<Tail, B>>
        : true
      : false
    : false;

export type Equal<A extends SET, B extends SET> = And<
  Subset<A, B>,
  Subset<B, A>
>;

export type Union<A extends SET, B extends SET> = A extends [
  infer Head extends SET,
  ...infer Tail extends SET,
]
  ? Member<Head, B> extends true
    ? Union<Tail, B>
    : [Head, ...Union<Tail, B>]
  : B;
