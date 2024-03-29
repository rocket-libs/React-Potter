export function isTruthy<T>(
  obj: T | null | undefined,
  propertyName: Extract<keyof T, string>
): boolean {
  if (!obj) {
    return false;
  } else {
    const targetValue = Reflect.get((obj as unknown) as object, propertyName);
    if (targetValue) {
      return true;
    } else {
      return false;
    }
  }
}

export function valueOrFallback<T>(
  candidate: T | null | undefined,
  fallbackValue: T
): T {
  if (candidate) {
    return candidate;
  } else {
    return fallbackValue;
  }
}
export function propertyIsNotEmptySet<T>(
  obj: T | null | undefined,
  propertyName: Extract<keyof T, string>
): boolean {
  if (isTruthy(obj, propertyName)) {
    const targetValue = Reflect.get((obj as unknown) as object, propertyName);
    if (Array.isArray(targetValue)) {
      return targetValue.length > 0;
    } else {
      throw new Error(`Property '${propertyName}' is not an array`);
    }
  } else {
    return false;
  }
}

export function arrayHasAtLeastOneElement(value: any[]): boolean {
  return propertyIsNotEmptySet(
    {
      proxyProperty: value,
    },
    "proxyProperty"
  );
}

export default class SafeReader<TClass> {
  private obj: TClass;

  constructor(obj: TClass) {
    this.obj = obj;
  }

  private valueNotEmpty(propertyName: Extract<keyof TClass, string>): boolean {
    return isTruthy<TClass>(this.obj, propertyName);
  }

  public isNotEmptySet(propertyName: Extract<keyof TClass, string>) {
    return propertyIsNotEmptySet<TClass>(this.obj, propertyName);
  }

  public getTruthyArray<TResult>(propertyName: Extract<keyof TClass, string>) {
    if (this.isNotEmptySet(propertyName)) {
      return Reflect.get(
        (this.obj as unknown) as object,
        propertyName
      ) as TResult[];
    } else {
      throw new Error(`Property '${propertyName}' is falsey`);
    }
  }

  public getTruthyValue<TResult>(propertyName: Extract<keyof TClass, string>) {
    if (this.valueNotEmpty(propertyName)) {
      return Reflect.get(
        (this.obj as unknown) as object,
        propertyName
      ) as TResult;
    } else {
      throw new Error(`Property '${propertyName}' is falsey`);
    }
  }

  public getArrayLength(propertyName: Extract<keyof TClass, string>): number {
    if (this.isNotEmptySet(propertyName)) {
      const arr = Reflect.get(
        (this.obj as unknown) as object,
        propertyName
      ) as any[];
      return arr.length;
    } else {
      return 0;
    }
  }
}
