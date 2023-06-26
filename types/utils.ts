type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];
type StringToUnion<T extends string> = Split<T, ','>[number]
