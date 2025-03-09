import { libLogWarn } from './base'

/**
 * 脱敏 从开始位置到结束位置
 * @param str
 * @param start
 * @param end
 * @returns string
 */
export const desensitize = (str: string, start: number, end: number) => {
	if (typeof str !== 'string' || typeof start !== 'number' || typeof end !== 'number') {
		libLogWarn('Invalid input', str, start, end)
		return str
	}
	if (start < 0 || end < 0 || start > end) {
		libLogWarn('Invalid start or end position', str, start, end)
		return str
	}
	const mask = '*'.repeat(end - start)
	return str.slice(0, start) + mask + str.slice(end)
}
