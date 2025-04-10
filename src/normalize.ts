export type Normalize<T extends boolean> = [T] extends [never]
  ? false
  : [T] extends [true]
    ? true
    : [T] extends [false]
      ? false
      : true;
