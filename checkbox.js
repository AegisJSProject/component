import { AegisInput } from './input.js';
import { SYMBOLS } from './consts.js';

const protectedData = new WeakMap();

function updateChecked(el) {
	const internals = protectedData.get(el).internals;
	el.value = el.getAttribute('value') ?? '';

	if (el.checked) {
		internals.ariaChecked = 'true';
	} else {
		internals.ariaChecked = 'false';

		if (el.required) {
			internals.setValidity({
				valueMissing: true,
			}, 'This input is required');
		}
	}
}

export class AegisCheckbox extends AegisInput {
	constructor(opts = {}) {
		super({ ...opts, role: 'checkbox' });
		console.warn(new Error('Aegis Checkbox components are still in development and should not be used.'));
	}

	async [SYMBOLS.initialize](opts) {
		const { internals } = await super[SYMBOLS.initialize](opts);
		protectedData.set(this, { internals });
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'checked') {
			updateChecked(this);
		} else if (name === 'required') {
			updateChecked(this);
			super.attributeChangedCallback(name, oldValue, newValue);
		} else {
			super.attributeChangedCallback(name, oldValue, newValue);
		}
	}

	get checked() {
		return this.hasAttribute('checked');
	}

	set checked(val) {
		this.toggleAttribute('checked', val);
	}

	static get observedAttributes() {
		return [...AegisInput.observedAttributes, 'checked'];
	}
}
