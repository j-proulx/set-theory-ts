import { describe, it, expectTypeOf } from 'vitest';
import type { Normalize } from '../src/normalize';

describe('Normalize<T>', () => {
  it('should return false for never', () => {
    expectTypeOf<Normalize<never>>().toEqualTypeOf<false>();
  });

  it('should return true for true', () => {
    expectTypeOf<Normalize<true>>().toEqualTypeOf<true>();
  });

  it('should return false for false', () => {
    expectTypeOf<Normalize<false>>().toEqualTypeOf<false>();
  });

  it('should return true for boolean', () => {
    expectTypeOf<Normalize<boolean>>().toEqualTypeOf<true>();
  });

  it('should return true for true | false', () => {
    expectTypeOf<Normalize<true | false>>().toEqualTypeOf<true>();
  });

  it('should return false for true & false', () => {
    expectTypeOf<Normalize<true & false>>().toEqualTypeOf<false>();
  });
});
