// set-types.test.ts
import { describe, it, expectTypeOf } from 'vitest';
import { Equal, Member, Subset, Union } from '../src/index';

describe('Subset', () => {
  it('handles empty subsets', () => {
    expectTypeOf<Subset<[], []>>().toEqualTypeOf<true>();
    expectTypeOf<Subset<[], [[]]>>().toEqualTypeOf<true>();
    expectTypeOf<Subset<[], [[[]]]>>().toEqualTypeOf<true>();
  });

  it('handles self-subsets and equal sets', () => {
    expectTypeOf<Subset<[[]], [[]]>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<[[]], [[]]>>().toEqualTypeOf<true>();
  });

  it('handles proper subsets', () => {
    expectTypeOf<Subset<[[]], [[], [[]]]>>().toEqualTypeOf<true>();
    expectTypeOf<Subset<[[], [[]]], [[], [[]]]>>().toEqualTypeOf<true>();
    expectTypeOf<Subset<[[], [[]]], [[[]], []]>>().toEqualTypeOf<true>();
  });

  it('detects non-subsets', () => {
    expectTypeOf<Subset<[[[[]]]], [[], [[]], [[[]]]]>>().toEqualTypeOf<true>();
    expectTypeOf<
      Subset<[[[[[]]]]], [[], [[]], [[[]]]]>
    >().toEqualTypeOf<false>();
  });

  it('works with deep nesting', () => {
    expectTypeOf<Subset<[[[]]], [[[]], [[], [[]]]]>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<[[[[]]]], [[[[]]]]>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<[[[[]]]], [[[[[]]]]]>>().toEqualTypeOf<false>();
  });

  it('handles unordered equality', () => {
    expectTypeOf<Equal<[[], [[]]], [[[]], []]>>().toEqualTypeOf<true>();
    expectTypeOf<Equal<[[], [[]]], [[], [[[]]]]>>().toEqualTypeOf<false>();
  });
});

describe('Member', () => {
  it('detects direct element match', () => {
    expectTypeOf<Member<[], [[], [[]], [[[]]]]>>().toEqualTypeOf<true>();
    expectTypeOf<Member<[[]], [[], [[]], [[[]]]]>>().toEqualTypeOf<true>();
    expectTypeOf<Member<[[[]]], [[], [[]], [[[]]]]>>().toEqualTypeOf<true>();
  });

  it('rejects elements not present', () => {
    expectTypeOf<Member<[[[[]]]], [[], [[]], [[[]]]]>>().toEqualTypeOf<false>();
    expectTypeOf<
      Member<[[[[[]]]]], [[], [[]], [[[]]]]>
    >().toEqualTypeOf<false>();
  });

  it('detects position-independent matches', () => {
    expectTypeOf<Member<[[[]]], [[[]], [[]], []]>>().toEqualTypeOf<false>();
    expectTypeOf<Member<[[[]]], [[], [[[]]], [[]]]>>().toEqualTypeOf<true>();
  });

  it('detects duplicate elements', () => {
    expectTypeOf<Member<[], [[], []]>>().toEqualTypeOf<true>();
    expectTypeOf<Member<[[]], [[], [[]], [[]]]>>().toEqualTypeOf<true>();
  });

  it('fails when set is empty', () => {
    expectTypeOf<Member<[], []>>().toEqualTypeOf<false>();
    expectTypeOf<Member<[[]], []>>().toEqualTypeOf<false>();
  });
});

describe('Union', () => {
    it('handles disjoint sets', () => {
      type A = [[], [[]]];
      type B = [[[[]]]];
      type Result = Union<A, B>;
      type Expected = [[], [[]], [[[]]]];
      expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
    });
  
    it('does not duplicate shared elements', () => {
      type A = [[], [[]]];
      type B = [[]];
      type Result = Union<A, B>;
      type Expected = [[], [[]]];
      expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
    });
  
    it('returns A if B is empty', () => {
      type A = [[], [[]], [[[]]]];
      type Result = Union<A, []>;
      expectTypeOf<Equal<Result, A>>().toEqualTypeOf<true>();
    });
  
    it('returns B if A is empty', () => {
      type B = [[], [[]], [[[]]]];
      type Result = Union<[], B>;
      expectTypeOf<Equal<Result, B>>().toEqualTypeOf<true>();
    });
  
    it('handles nested duplicates correctly', () => {
      type A = [[], [[]]];
      type B = [[], [[]], [[]]];
      type Result = Union<A, B>;
      type Expected = [[], [[]]];
      expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
    });
  
    it('respects insertion order of A followed by missing from B', () => {
      type A = [[[]], []];
      type B = [[[[]]]];
      type Result = Union<A, B>;
      type Expected = [[[]], [], [[[]]]];
      expectTypeOf<Equal<Result, Expected>>().toEqualTypeOf<true>();
    });
  });