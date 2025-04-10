import { EMPTY, SET, Union } from '..';

export type Zero = EMPTY;

export type Successor<N extends SET> = Union<N, [N]>;

export type One = Successor<Zero>;
export type Two = Successor<One>;
export type Three = Successor<Two>;

export type Cardinality<N extends SET> = N['length'];
export type CardinalThree = Cardinality<Three>;

export type Natural<Ordinal extends number, Accumulator extends SET = Zero> =
  Cardinality<Accumulator> extends Ordinal
    ? Accumulator
    : Natural<Ordinal, Successor<Accumulator>>;

export type Ten = Natural<10>;
export type CardinalTen = Cardinality<Ten>;
