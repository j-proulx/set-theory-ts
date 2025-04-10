// test/or.test.ts
import { describe, it, expectTypeOf } from 'vitest';
import { Or } from '../src/normalize';

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
