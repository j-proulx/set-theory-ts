export type Normalize<T extends boolean> = [T] extends [never]
  ? false
  : [T] extends [true]
    ? true
    : [T] extends [false]
      ? false
      : true;

// --- Logical Binary Operators ---
export type And<A extends boolean, B extends boolean> = Normalize<A & B>;
export type Or<A extends boolean, B extends boolean> = Normalize<A | B>;

// --- Operator Meta Types (logic-free)
export type AndMeta = { type: 'And'; identity: true };
export type OrMeta = { type: 'Or'; identity: false };

export type MetaOperator = AndMeta | OrMeta;

// --- Apply logic externally based on the tag
type Apply<
  Op extends MetaOperator,
  A extends boolean,
  B extends boolean,
> = Op['type'] extends 'And'
  ? And<A, B>
  : Op['type'] extends 'Or'
    ? Or<A, B>
    : never;

// --- Reduce ---
export type Reduce<
  Op extends MetaOperator,
  Acc extends boolean,
  List extends boolean[],
> = List extends [infer Head extends boolean, ...infer Tail extends boolean[]]
  ? Reduce<Op, Apply<Op, Acc, Head>, Tail>
  : Acc;

// --- Recursive API ---
export type Recursive<
  Op extends MetaOperator,
  Operands extends boolean[],
> = Reduce<Op, Op['identity'], Operands>;

export type IteratedAnd<Operands extends boolean[]> = Recursive<AndMeta, Operands>;
export type IteratedOr<Operands extends boolean[]> = Recursive<OrMeta, Operands>;
