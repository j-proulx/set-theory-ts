// test/or.test.ts
import { describe, it, expectTypeOf } from 'vitest';
import { IteratedOr, Or } from '../src/normalize';

describe('Or<A, B>', () => {
  it('true | true = true', () => {
    expectTypeOf<Or<true, true>>().toEqualTypeOf<true>();
  });

  it('true | false = true', () => {
    expectTypeOf<Or<true, false>>().toEqualTypeOf<true>();
  });

  it('false | true = true', () => {
    expectTypeOf<Or<false, true>>().toEqualTypeOf<true>();
  });

  it('false | false = false', () => {
    expectTypeOf<Or<false, false>>().toEqualTypeOf<false>();
  });

  it('boolean | true = true', () => {
    expectTypeOf<Or<boolean, true>>().toEqualTypeOf<true>();
  });

  it('boolean | false = true', () => {
    expectTypeOf<Or<boolean, false>>().toEqualTypeOf<true>();
  });

  it('boolean | boolean = true', () => {
    expectTypeOf<Or<boolean, boolean>>().toEqualTypeOf<true>();
  });

  it('true | boolean = true', () => {
    expectTypeOf<Or<true, boolean>>().toEqualTypeOf<true>();
  });

  it('false | boolean = true', () => {
    expectTypeOf<Or<false, boolean>>().toEqualTypeOf<true>();
  });
});

describe('IteratedOr', () => {
  it('returns true if any value is true', () => {
    expectTypeOf<IteratedOr<[false, true, false]>>().toEqualTypeOf<true>();
    expectTypeOf<IteratedOr<[true, true]>>().toEqualTypeOf<true>();
    expectTypeOf<IteratedOr<[false, false, false, true, false]>>().toEqualTypeOf<true>();
    expectTypeOf<IteratedOr<[true, false, false, false, false, false, false]>>().toEqualTypeOf<true>();
    expectTypeOf<IteratedOr<[false, false, false, false, true, true, false, false, false]>>().toEqualTypeOf<true>();
  });

  it('returns false for all-false input', () => {
    expectTypeOf<IteratedOr<[false, false, false]>>().toEqualTypeOf<false>();
    expectTypeOf<IteratedOr<[false, false, false, false, false, false, false, false]>>().toEqualTypeOf<false>();
  });

  it('returns false for empty input (identity)', () => {
    expectTypeOf<IteratedOr<[]>>().toEqualTypeOf<false>();
  });

  it('returns same as single element', () => {
    expectTypeOf<IteratedOr<[true]>>().toEqualTypeOf<true>();
    expectTypeOf<IteratedOr<[false]>>().toEqualTypeOf<false>();
  });
});