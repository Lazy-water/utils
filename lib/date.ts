import { padNumber } from './number'

export const timestamp = () => +Date.now()

/**
 * 从日期字符串获取 Date
 * @param {String} datetimeStr 日期时间 2021-12-17 02:16:16 | 2022-01-01T00:00:00+08:00
 * @returns Date
 */
export const dateFromString = (datetimeStr: string): Date => {
	if (datetimeStr.length > 19) datetimeStr = datetimeStr.substring(0, 19).replace('T', ' ')
	return new Date(datetimeStr.replace(/-/g, '/'))
}

/**
 * 格式化日期
 * @param date 日期Date
 * @param opt { format: YYYY-MM-DD HH:mm:ss 目前只支持删减、改符号 }
 */
export const formatDate = (date: Date, opt?: { format?: string }) => {
	const { format = 'YYYY-MM-DD HH:mm:ss' } = opt || {}
	const YY = date.getFullYear()
	const MM = padNumber(date.getMonth() + 1, 2)
	const DD = padNumber(date.getDate(), 2)
	const HH = padNumber(date.getHours(), 2)
	const mm = padNumber(date.getMinutes(), 2)
	const ss = padNumber(date.getSeconds(), 2)
	return format
		.replace('YYYY', `${YY}`)
		.replace('MM', MM)
		.replace('DD', DD)
		.replace('HH', HH)
		.replace('mm', mm)
		.replace('ss', ss)
}
