import { describe, it, expectTypeOf } from 'vitest';
import { Zero, Successor, Natural, Cardinality } from '../src/numbers/natural';
import { Equal, Member } from '../src';

describe('Natural Numbers', () => {
  it('defines Zero correctly', () => {
    expectTypeOf<Zero>().toEqualTypeOf<[]>(); // Zero is empty set
    expectTypeOf<Cardinality<Zero>>().toEqualTypeOf<0>(); // length 0
  });

  it('builds successors correctly', () => {
    type One = Successor<Zero>;
    type Two = Successor<One>;
    type Three = Successor<Two>;
    type Four = Successor<Three>;

    expectTypeOf<Cardinality<One>>().toEqualTypeOf<1>();
    expectTypeOf<Cardinality<Two>>().toEqualTypeOf<2>();
    expectTypeOf<Cardinality<Three>>().toEqualTypeOf<3>();
    expectTypeOf<Cardinality<Four>>().toEqualTypeOf<4>();
  });

  it('builds Natural<N> values recursively', () => {
    expectTypeOf<Cardinality<Natural<0>>>().toEqualTypeOf<0>();
    expectTypeOf<Cardinality<Natural<1>>>().toEqualTypeOf<1>();
    expectTypeOf<Cardinality<Natural<2>>>().toEqualTypeOf<2>();
    expectTypeOf<Cardinality<Natural<3>>>().toEqualTypeOf<3>();
    expectTypeOf<Cardinality<Natural<4>>>().toEqualTypeOf<4>();
    expectTypeOf<Cardinality<Natural<5>>>().toEqualTypeOf<5>();
    expectTypeOf<Cardinality<Natural<10>>>().toEqualTypeOf<10>();
  });

  it('produces correct structural sets', () => {
    type One = Successor<Zero>;
    type OneFromNatural = Natural<1>;
    type Two = Successor<One>;
    type TwoFromNatural = Natural<2>;

    expectTypeOf<Equal<One, OneFromNatural>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<Two, TwoFromNatural>>().toEqualTypeOf<true>();
  });

  it('preserves uniqueness of set values', () => {
    type One = Successor<Zero>;
    type Two = Successor<One>;
    type Three = Successor<Two>;

    expectTypeOf<Member<Zero, One>>().toEqualTypeOf<true>();
    expectTypeOf<Member<One, Two>>().toEqualTypeOf<true>();
    expectTypeOf<Member<Two, Three>>().toEqualTypeOf<true>();
    expectTypeOf<Member<Three, Two>>().toEqualTypeOf<false>();
  });
});
