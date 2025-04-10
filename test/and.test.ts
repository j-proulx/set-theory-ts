import { describe, it, expectTypeOf } from 'vitest';
import { And } from '../src/normalize';

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
