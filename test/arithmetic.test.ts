import { describe, it, expectTypeOf } from 'vitest';
import { Zero, Natural, Cardinality } from '../src/numbers/natural';
import { Add } from '../src/numbers/arithmetic';
import { Equal } from '../src';

describe('Add', () => {
  it('adds zero correctly', () => {
    type ZeroPlusZero = Add<Zero, Zero>;
    expectTypeOf<Equal<ZeroPlusZero, Zero>>().toEqualTypeOf<true>();

    type One = Natural<1>;
    expectTypeOf<Equal<Add<Zero, One>, One>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<Add<One, Zero>, One>>().toEqualTypeOf<true>();
  });

  it('adds small numbers correctly', () => {
    type One = Natural<1>;
    type Two = Natural<2>;
    type Three = Natural<3>;
    type Four = Natural<4>;
    type Five = Natural<5>;

    expectTypeOf<Equal<Add<One, Two>, Three>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<Add<Two, Two>, Four>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<Add<Two, Three>, Five>>().toEqualTypeOf<true>();
  });

  it('produces correct cardinalities', () => {
    type A = Natural<3>;
    type B = Natural<4>;
    type Sum = Add<A, B>;
    expectTypeOf<Cardinality<Sum>>().toEqualTypeOf<7>();
  });

  it('supports deeply nested additions', () => {
    type A = Natural<5>;
    type B = Natural<6>;
    type Sum = Add<A, B>;
    expectTypeOf<Cardinality<Sum>>().toEqualTypeOf<11>();
  });

  it('is commutative for small values', () => {
    type A = Natural<3>;
    type B = Natural<2>;
    type AB = Add<A, B>;
    type BA = Add<B, A>;
    expectTypeOf<Equal<AB, BA>>().toEqualTypeOf<true>();
  });
});
