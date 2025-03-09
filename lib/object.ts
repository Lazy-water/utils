/**
 * 判断对象是否具有某个属性
 * @param obj
 * @param v PropertyKey
 * @returns boolean
 */
export const hasOwnProperty = <T>(obj: T, v: PropertyKey) => {
	if (obj == null) return false
	return Object.prototype.hasOwnProperty.call(obj, v)
}

/**
 * 深拷贝
 * @param obj
 * @returns 深拷贝后的对象
 */
export const deepClone = <T>(obj: T): T => {
	if (obj === null || typeof obj !== 'object') {
		return obj
	}
	if (obj instanceof Date) {
		return new Date(obj.getTime()) as any
	}
	if (obj instanceof Array) {
		return obj.map((item) => deepClone(item)) as any
	}
	if (obj instanceof Map) {
		return new Map(Array.from(obj.entries()).map(([key, value]) => [deepClone(key), deepClone(value)])) as any
	}
	if (obj instanceof Set) {
		return new Set(Array.from(obj).map((item) => deepClone(item))) as any
	}
	const clonedObj: any = {}
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			clonedObj[key] = deepClone((obj as any)[key])
		}
	}
	return clonedObj
}

/**
 * 判断对象是否为空
 * @param obj
 * @returns boolean
 */
export const isEmptyObject = (obj: any): boolean => {
	if (obj === null || typeof obj !== 'object') {
		return false
	}
	return Object.keys(obj).length === 0
}
