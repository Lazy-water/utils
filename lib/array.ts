export type Nullable<T> = T | null | undefined

/**
 * 数组类型
 */
export type Arrayable<T> = T | Array<T>

/**
 * 数组去重
 * @param array
 * @returns 去重后的数组
 */
export const uniq = <T>(array: readonly T[]): T[] => {
	return Array.from(new Set(array))
}

/**
 * 转数组
 * @param array
 * @returns 数组
 */
export const toArray = <T>(array?: Nullable<Arrayable<T>>): Array<T> => {
	array = array ?? []
	return Array.isArray(array) ? array : [array]
}

/**
 * 数组并展平
 * @param array
 * @returns 数组
 */
export const flattenArrayable = <T>(array?: Nullable<Arrayable<T | Array<T>>>): Array<T> => {
	return toArray(array).flat(1) as Array<T>
}

/**
 * 数组求和
 * @param args
 * @returns 数组求和
 */
export const sum = (...args: number[] | number[][]) => {
	return flattenArrayable(args).reduce((a, b) => a + b, 0)
}
