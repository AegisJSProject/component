import { AegisInput } from '@aegisjsproject/component/input.js';
import {
	ValueMissingError, TypeMismatchError, TooLongError,
	TooShortError,
} from '@aegisjsproject/component/errors.js';
import { TRIGGERS, SYMBOLS } from '@aegisjsproject/component/consts.js';
import { getInt, setInt } from '@aegisjsproject/component/attrs.js';
import { html } from '@aegisjsproject/core/core.js';

class TestInput extends AegisInput {
	async [SYMBOLS.sanitizeValue]({ value, shadow }) {
		const anchor = shadow.getElementById('content');

		if (typeof value !== 'string') {
			throw new TypeMismatchError('Value must be a string.', { anchor });
		} else if (this.required && value.length === 0) {
			throw new ValueMissingError('Value is required.');
		} else if (value.length < this.minLength) {
			throw new TooShortError(`Value must be at least ${this.minLength} chars.`, { anchor });
		} else if (value.length > this.maxLength) {
			throw new TooLongError(`Value must be fewer than ${this.maxLength} chars.`, { anchor });
		} else {
			const el = document.createElement('div');
			el.append(html`${value}`);
			return el.innerHTML;
		}
	}

	async [SYMBOLS.render](type, { shadow,  name, disabled }) {
		switch(type) {
			case TRIGGERS.constructed:
				shadow.append(html`<div id="content" contenteditable="true">Type Stuff!</div>`);

				shadow.getElementById('content').addEventListener('input', event => {
					this.value = event.target.innerHTML;
				});

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
