export const SYMBOLS = {
	render: Symbol.for('aegis:render'),
	initialize: Symbol.for('aegis:initialize'),
	initialized: Symbol.for('aegis:initialized'),
	setValue: Symbol.for('aegis:value:set'),
};

export const TRIGGERS = {
	constructed: 'aegis:constructed',
	connected: 'aegis:connected',
	disconnected: 'aegis:disconnected',
	slotChanged: 'aegis:slotchanged',
	attributeChanged: 'aegis:attributechanged',
	adopted: 'aegis:adopted',
	unknown: 'aegis:unknown',
	formAssociated: 'aegis:form:associated',
	formDisabled: 'aegis:form:disabled',
	formReset: 'aegis:form:reset',
	formStateRestore: 'aegis:form:state-restore',
	colorSchemeChanged: 'aegis:color-scheme-changed',
	// valueChanged: Symbol.for('aegis:value:change'),
};

export const EVENTS = {
	connected: 'aegis:connected',
	disconnected: 'aegis:disconnected',
	adopted: 'aegis:adopted',
};
