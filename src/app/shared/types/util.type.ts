export type Morph<TypeToMorph, NewPropertyType = any> = {
  [P in keyof TypeToMorph]: NewPropertyType;
};

type PartialExcept<T, K extends keyof T> = { [OptionalProperty in keyof T]?: T[OptionalProperty] } &
  { [RequiredProperty in K]: T[RequiredProperty] };
