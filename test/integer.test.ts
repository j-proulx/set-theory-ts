import { describe, it, expectTypeOf } from 'vitest';
import { Equal } from '../src/index';
import { KuratowskiPair } from '../src/numbers/integer';
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
