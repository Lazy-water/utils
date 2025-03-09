/**
 * 校验手机号
 * @param phone
 * @returns boolean
 */
export const validatePhoneNumber = (phone: string) => {
	const reg = /^1[3-9]{1}\d{9}$/
	return reg.test(phone)
}

/**
 * 校验是否为整数
 * @param {*} str
 * @returns boolean
 */
export const validateInteger = (str: string) => /^-?\d+$/.test(str)

/**
 * 校验非零正整数
 * @param {*} str
 * @returns boolean
 */
export const validatePositiveInteger = (str: string) => /^[1-9]\d*$/.test(str)

/**
 * 校验验证有2位小数以内的正数
 * @param {*} num
 * @returns boolean
 */
export const validateTwoFloatPoint = (num: string) => /^[0-9]+(.[0-9]{1,2})?$/.test(num)
