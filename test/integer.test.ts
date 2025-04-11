import { describe, it, expectTypeOf } from 'vitest';
import { Equal } from '../src/index';
import {
  EqualInteger,
  FirstOf,
  Integer,
  KuratowskiPair,
  SecondOf,
} from '../src/numbers/integer';
import { Zero, One, Two, Three } from '../src/numbers/natural';

describe('KuratowskiPair', () => {
  it('collapses (0, 0) to singleton', () => {
    type Result = KuratowskiPair<Zero, Zero>;
    type Expected = [[Zero]];
    expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
  });

  it('collapses (1, 1) to singleton', () => {
    type Result = KuratowskiPair<One, One>;
    type Expected = [[One]];
    expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
  });

  it('retains structure for (0, 1)', () => {
    type Result = KuratowskiPair<Zero, One>;
    type Expected = [[Zero], [Zero, One]];
    expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
  });

  it('retains structure for (1, 0)', () => {
    type Result = KuratowskiPair<One, Zero>;
    type Expected = [[One], [One, Zero]];
    expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
  });

  it('retains structure for (1, 2)', () => {
    type Result = KuratowskiPair<One, Two>;
    type Expected = [[One], [One, Two]];
    expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
  });

  it('collapses (2, 2) to singleton', () => {
    type Result = KuratowskiPair<Two, Two>;
    type Expected = [[Two]];
    expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
  });

  it('retains structure for (0, 3)', () => {
    type Result = KuratowskiPair<Zero, Three>;
    type Expected = [[Zero], [Zero, Three]];
    expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
  });

  it('collapses (3, 3) to singleton', () => {
    type Result = KuratowskiPair<Three, Three>;
    type Expected = [[Three]];
    expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
  });
});

describe('FirstOf / SecondOf (Kuratowski Pair accessors)', () => {
  it('extracts from (0, 0)', () => {
    type Pair = KuratowskiPair<Zero, Zero>;
    expectTypeOf<Equal<FirstOf<Pair>, Zero>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<SecondOf<Pair>, Zero>>().toEqualTypeOf<true>();
  });

  it('extracts from (0, 1)', () => {
    type Pair = KuratowskiPair<Zero, One>;
    expectTypeOf<Equal<FirstOf<Pair>, Zero>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<SecondOf<Pair>, One>>().toEqualTypeOf<true>();
  });

  it('extracts from (1, 0)', () => {
    type Pair = KuratowskiPair<One, Zero>;
    expectTypeOf<Equal<FirstOf<Pair>, One>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<SecondOf<Pair>, Zero>>().toEqualTypeOf<true>();
  });

  it('extracts from (2, 2)', () => {
    type Pair = KuratowskiPair<Two, Two>;
    expectTypeOf<Equal<FirstOf<Pair>, Two>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<SecondOf<Pair>, Two>>().toEqualTypeOf<true>();
  });

  it('extracts from (3, 1)', () => {
    type Pair = KuratowskiPair<Three, One>;
    expectTypeOf<Equal<FirstOf<Pair>, Three>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<SecondOf<Pair>, One>>().toEqualTypeOf<true>();
  });
});

describe('EqualInteger', () => {
  it('returns true for identical pairs', () => {
    type I1 = Integer<Zero, One>;
    type I2 = Integer<Zero, One>;
    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<true>();
  });

  it('returns false for swapped pairs', () => {
    type I1 = Integer<Zero, One>;
    type I2 = Integer<One, Zero>;
    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<false>();
  });

  it('returns true for (2, 3) = (2, 3)', () => {
    type I1 = Integer<Two, Three>;
    type I2 = Integer<Two, Three>;
    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<true>();
  });

  it('returns false for (3, 2) ≠ (2, 3)', () => {
    type I1 = Integer<Three, Two>;
    type I2 = Integer<Two, Three>;
    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<false>();
  });

  it('returns true for (0, 0) = (0, 0)', () => {
    type I1 = Integer<Zero, Zero>;
    type I2 = Integer<Zero, Zero>;
    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<true>();
  });

  it('returns false for (0, 0) ≠ (0, 1)', () => {
    type I1 = Integer<Zero, Zero>;
    type I2 = Integer<Zero, One>;
    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<false>();
  });
});

describe('EqualInteger (value-based equivalence)', () => {
  it('equates (1, 0), (2, 1), (3, 2)', () => {
    type I1 = Integer<One, Zero>; // 1
    type I2 = Integer<Two, One>; // 1
    type I3 = Integer<Three, Two>; // 1

    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<true>();
    expectTypeOf<EqualInteger<I2, I3>>().toEqualTypeOf<true>();
    expectTypeOf<EqualInteger<I1, I3>>().toEqualTypeOf<true>();
  });

  it('equates (2, 3), (1, 2), (0, 1)', () => {
    type I1 = Integer<Two, Three>; // -1
    type I2 = Integer<One, Two>; // -1
    type I3 = Integer<Zero, One>; // -1

    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<true>();
    expectTypeOf<EqualInteger<I2, I3>>().toEqualTypeOf<true>();
    expectTypeOf<EqualInteger<I1, I3>>().toEqualTypeOf<true>();
  });

  it('equates (2, 2) = (1, 1) = (0, 0)', () => {
    type I1 = Integer<Two, Two>;
    type I2 = Integer<One, One>;
    type I3 = Integer<Zero, Zero>;

    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<true>();
    expectTypeOf<EqualInteger<I2, I3>>().toEqualTypeOf<true>();
    expectTypeOf<EqualInteger<I1, I3>>().toEqualTypeOf<true>();
  });

  it('distinguishes (3, 1) from (2, 1)', () => {
    type I1 = Integer<Three, One>; // 2
    type I2 = Integer<Two, One>; // 1
    expectTypeOf<EqualInteger<I1, I2>>().toEqualTypeOf<false>();
  });
});
