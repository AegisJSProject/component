/**
 * @copyright 2023-2024 Chris Zuber <admin@kernvalley.us>
 */
import { setAttr, isScriptURL, isTrustedType } from '@aegisjsproject/core/trust.js';

const clamp = Math.clamp instanceof Function ? Math.clamp : (min, val, max) => Math.min(max, Math.max(min, val));
const between = (min, val, max) => typeof val === 'number' && val >= min && val <= max;

export function getBool(el, attr) {
	return el.hasAttribute(attr);
}

export function setBool(el, attr, val) {
	el.toggleAttribute(attr, val);
}

export function getInt(el, attr, {
	fallback = NaN,
	min = Number.MIN_SAFE_INTEGER,
	max = Number.MAX_SAFE_INTEGER,
} = {}) {
	if (el.hasAttribute(attr)) {
		const val = clamp(min, parseInt(el.getAttribute(attr)), max);
		return Number.isNaN(val) ? fallback : val;
	} else {
		return fallback;
	}
}

export function setInt(el, attr, val, {
	min = Number.MIN_SAFE_INTEGER,
	max = Number.MAX_SAFE_INTEGER,
	policy,
} = {}) {
	if (val instanceof Date) {
		setAttr(el, attr, val.getTime(), { min, max, policy});
	} else if (Number.isInteger(val)) {
		setAttr(el, attr, clamp(min, val, max), { policy });
	} else if (typeof val === 'string') {
		setInt(el, attr, parseInt(val), { min, max });
	} else {
		el.removeAttribute(attr);
	}
}

export function getFloat(el, attr, {
	fallback = NaN,
	min = Number.MIN_SAFE_INTEGER,
	max = Number.MAX_SAFE_INTEGER,
} = {}) {
	if (el.hasAttribute(attr)) {
		const val = clamp(min, parseFloat(el.getAttribute(attr)), max);
		return Number.isNaN(val) ? fallback : val;
	} else {
		return fallback;
	}
}

export function setFloat(el, attr, val, {
	min = Number.MIN_SAFE_INTEGER,
	max = Number.MAX_SAFE_INTEGER,
	policy,
} = {}) {
	if (typeof val === 'number' && ! Number.isNaN(val)) {
		setAttr(el, attr, clamp(min, val, max), { policy });
	} else if (typeof val === 'string') {
		setFloat(el, attr, parseFloat(val), { min, max });
	} else {
		el.removeAttribute(attr);
	}
}

export function getString(el, attr, { fallback = null } = {}) {
	if (el.hasAttribute(attr)) {
		return el.getAttribute(attr) || fallback;
	} else {
		return fallback;
	}
}

export function setString(el, attr, val, {
	minLength = 0,
	maxLength = Infinity,
	pattern   = null,
	fallback,
	policy,
} = {}) {
	if (
		typeof val === 'string'
		&& between(minLength, val.length, maxLength)
		&& (! (pattern instanceof RegExp) || pattern.test(val))
	) {
		setAttr(el, attr, val, { policy });
	} else if(isTrustedType(val)) {
		const str = val.toString();

		if (
			between(minLength, str.length, maxLength)
			&& (! (pattern instanceof RegExp) || pattern.test(str))
		) {
			setAttr(el, attr, val, { policy });
		} else {
			el.removeAttribute(attr);
		}
	} else if (typeof fallback === 'string' || isTrustedType(fallback)) {
		setString(el, attr, fallback, { pattern, policy, minLength, maxLength });
	} else {
		el.removeAttribute(attr);
	}
}

export function getURL(el, attr, { base = document.baseURI } = {}) {
	if (el.hasAttribute(attr)) {
		return new URL(el.getAttribute(attr), base);
	} else {
		return null;
	}
}

export function setURL(el, attr, val, {
	base = document.baseURI,
	requirePath = false,
	policy,
} = {}) {
	if ((val instanceof URL) && (! requirePath || val.pathname.length > 1)) {
		setAttr(el, attr, val.href, { policy });
	} else if (typeof val === 'string' && val.length !== 0) {
		setURL(el, attr, new URL(val, base), { requirePath });
	} else if (isScriptURL(val)) {
		const url = new URL(val.toString(), document.baseURI);

		if (! requirePath || url.pathname.length > 1) {
			setAttr(el, attr, val, { policy });
		} else {
			el.removeAttribute(attr);
		}
	} else {
		el.removeAttribute(attr);
	}
}
