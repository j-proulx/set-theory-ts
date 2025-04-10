import { describe, it, expectTypeOf } from 'vitest';
import { And, IteratedAnd } from '../src/normalize';

describe('And<A, B>', () => {
  it('true & true = true', () => {
    expectTypeOf<And<true, true>>().toEqualTypeOf<true>();
  });

  it('true & false = false', () => {
    expectTypeOf<And<true, false>>().toEqualTypeOf<false>();
  });

  it('false & true = false', () => {
    expectTypeOf<And<false, true>>().toEqualTypeOf<false>();
  });

  it('false & false = false', () => {
    expectTypeOf<And<false, false>>().toEqualTypeOf<false>();
  });

  it('boolean & true = true', () => {
    expectTypeOf<And<boolean, true>>().toEqualTypeOf<true>();
  });

  it('boolean & false = false', () => {
    expectTypeOf<And<boolean, false>>().toEqualTypeOf<false>();
  });

  it('boolean & boolean = true', () => {
    expectTypeOf<And<boolean, boolean>>().toEqualTypeOf<true>();
  });

  it('true & boolean = true', () => {
    expectTypeOf<And<true, boolean>>().toEqualTypeOf<true>();
  });

  it('false & boolean = false', () => {
    expectTypeOf<And<false, boolean>>().toEqualTypeOf<false>();
  });
});

describe('IteratedAnd', () => {
  it('returns true for all-true input', () => {
    expectTypeOf<IteratedAnd<[true, true, true]>>().toEqualTypeOf<true>();
    expectTypeOf<
      IteratedAnd<[true, true, true, true, true]>
    >().toEqualTypeOf<true>();
    expectTypeOf<
      IteratedAnd<[true, true, true, true, true, true, true, true, true, true]>
    >().toEqualTypeOf<true>();
  });

  it('returns false if any value is false', () => {
    expectTypeOf<IteratedAnd<[true, false, true]>>().toEqualTypeOf<false>();
    expectTypeOf<
      IteratedAnd<[true, true, true, false, true]>
    >().toEqualTypeOf<false>();
    expectTypeOf<
      IteratedAnd<[true, true, true, true, false, true, true]>
    >().toEqualTypeOf<false>();
    expectTypeOf<
      IteratedAnd<[false, false, false, false, false]>
    >().toEqualTypeOf<false>();
  });

  it('returns true for empty input (identity)', () => {
    expectTypeOf<IteratedAnd<[]>>().toEqualTypeOf<true>();
  });

  it('returns same as single element', () => {
    expectTypeOf<IteratedAnd<[true]>>().toEqualTypeOf<true>();
    expectTypeOf<IteratedAnd<[false]>>().toEqualTypeOf<false>();
  });
});
