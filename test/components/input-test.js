import { AegisInput } from '@aegisjsproject/component/input.js';
import { TRIGGERS, SYMBOLS } from '@aegisjsproject/component/consts.js';
import { getInt, setInt } from '@aegisjsproject/component/attrs.js';
import { html } from '@aegisjsproject/core/parsers/html.js';
import { registerCallback } from '@aegisjsproject/core/callbackRegistry.js';
import { EVENTS } from '@aegisjsproject/core/events.js';

const inputHandler = registerCallback(
	'test-input:input',
	event => event.target.getRootNode().host.value = event.target.innerHTML.trim(),
);

const template = html`<div contenteditable="true" ${EVENTS.onInput}="${inputHandler}"></div>`;

class TestInput extends AegisInput {
	constructor() {
		super({ template });
	}

	async [SYMBOLS.sanitizeValue]({ value, shadow }) {
		const anchor = shadow.getElementById('content');

		if (typeof value !== 'string') {
			throw new AegisInput.TypeMismatchError('Value must be a string.', { anchor });
		} else if (this.required && value.length === 0) {
			throw new AegisInput.ValueMissingError('Value is required.');
		} else if (value.length < this.minLength) {
			throw new AegisInput.TooShortError(`Value must be at least ${this.minLength} chars.`, { anchor });
		} else if (value.length > this.maxLength) {
			throw new AegisInput.TooLongError(`Value must be fewer than ${this.maxLength} chars.`, { anchor });
		} else {
			const el = document.createElement('div');
			el.setHTML(value);
			return el.innerHTML;
		}
	}

	async [SYMBOLS.render](type, { shadow, name, disabled }) {
		switch(type) {
			case TRIGGERS.constructed:
				this.value = 'Enter Some Text!';
				break;

			case TRIGGERS.formReset:
				shadow.getElementById('content').textContent = ' ';
				break;

			case TRIGGERS.attributeChanged:
				if (name === 'readonly') {
					shadow.getElementById('content').contentEditable = this.readOnly ? 'false' : 'true';
				}
				break;

			case TRIGGERS.formDisabled:
				shadow.getElementById('content').contentEditable = disabled ? 'false' : 'true';
				break;
		}
	}

	get maxLength() {
		return getInt(this, 'maxlength', { fallback: Number.MAX_SAFE_INTEGER });
	}

	set maxLength(val) {
		setInt(this, 'maxlength', val, { min: 0 });
	}

	get minLength() {
		return getInt(this, 'minlength', { fallback: 0 });
	}

	set minLength(val) {
		setInt(this, 'minlength', val, { min: 0 });
	}
}

TestInput.register('input-test');
