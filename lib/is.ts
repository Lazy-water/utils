import { toString } from "./base";

export const isBoolean = (val: any): val is boolean => typeof val === "boolean";

export const isFunction = <T extends Function>(val: any): val is T =>
  typeof val === "function";

export const isString = (val: any): val is string => typeof val === "string";

export const isNumber = (val: any): val is number => typeof val === "number";

export const isArray = (val: any): val is any[] =>
  toString(val) === "[object Array]";

export const isObject = (val: any): val is object =>
  toString(val) === "[object Object]";

export const isUndefined = (val: any): val is undefined =>
  toString(val) === "[object Undefined]";

export const isNull = (val: any): val is null =>
  toString(val) === "[object Null]";

export const isMap = (val: any): val is Map<any, any> =>
  toString(val) === "[object Map]";

export const isRegExp = (val: any): val is RegExp =>
  toString(val) === "[object RegExp]";

export const isDate = (val: any): val is Date =>
  toString(val) === "[object Date]";

export const isBrowser = typeof window !== "undefined";

export const isWindow = (val: any): boolean =>
  typeof window !== "undefined" && toString(val) === "[object Window]";

export const isPromise = (val: any): val is Promise<any> =>
  val instanceof Promise || typeof val?.then === "function";
