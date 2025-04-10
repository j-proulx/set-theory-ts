export type Normalize<T extends boolean> = [T] extends [never]
  ? false
  : [T] extends [true]
    ? true
    : [T] extends [false]
      ? false
      : true;

export type And<A extends boolean, B extends boolean> = Normalize<A & B>;
export type Or<A extends boolean, B extends boolean> = Normalize<A | B>;
