export type Morph<TypeToMorph, NewPropertyType = any> = {
  [P in keyof TypeToMorph]: NewPropertyType;
};

export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & { [RequiredProperty in K]: T[RequiredProperty] };

export type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & { [RequiredProperty in K]?: T[RequiredProperty] };

export type PartialPick<T, K extends keyof T> = Omit<T, K> & { [OptionalProperty in K]?: T[OptionalProperty] };
