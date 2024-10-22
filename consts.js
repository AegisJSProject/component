export const SYMBOLS = {
	render: Symbol.for('aegis:render'),
	observeStates: Symbol.for('aegis:states:observe'),
	initialize: Symbol.for('aegis:initialize'),
	initialized: Symbol.for('aegis:initialized'),
	setValue: Symbol.for('aegis:value:set'),
	sanitizeValue: Symbol.for('aegis:value:sanitize'),
	hasState: Symbol.for('aegis:states:has'),
	getStates: Symbol.for('aegis:states:get'),
};

/**
 * Custom States are `--` prefixed for compatibility with bad Chrome implementation
 */
export const STATES = {
	initialized: '--initialized',
	loading: '--loading',
	ready: '--ready',
	valid: '--valid',
	invalid: '--invalid',
	required: '--required',
	disabled: '--disabled',
	readOnly: '--readonly',
	checked: '--checked',
};

export const TRIGGERS = {
	constructed: 'aegis:constructed',
	connected: 'aegis:connected',
	disconnected: 'aegis:disconnected',
	slotChanged: 'aegis:slotchanged',
	attributeChanged: 'aegis:attributechanged',
	adopted: 'aegis:adopted',
	stateChanged: 'aegis:state:changed',
	unknown: 'aegis:unknown',
	formAssociated: 'aegis:form:associated',
	formDisabled: 'aegis:form:disabled',
	formReset: 'aegis:form:reset',
	formStateRestore: 'aegis:form:state-restore',
	colorSchemeChanged: 'aegis:color-scheme-changed',
};

export const EVENTS = {
	connected: 'aegis:connected',
	disconnected: 'aegis:disconnected',
	adopted: 'aegis:adopted',
	valid: 'aegis:valid',
	invalid: 'aegis:invalid',
};
