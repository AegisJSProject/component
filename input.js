import { AegisComponent } from './base.js';
import { TRIGGERS, SYMBOLS, STATES, EVENTS } from './consts.js';
import { getBool, setBool, getString, setString } from './attrs.js';

const protectedData = new WeakMap();

const getInternals = target => protectedData.get(target);

const whenInit = async (target, callback) => await target.whenInitialized
	.then(() => callback.call(target, protectedData.get(target)));

import {
	AegisInputError, ValueMissingError, TypeMismatchError, PatternMismatchError,
	TooLongError, TooShortError, RangeUnderflowError, RangeOverflowError,
	StepMismatchError, BadInputError,
} from './errors.js';

export const ERRORS = {
	AegisInputError, ValueMissingError, TypeMismatchError, PatternMismatchError,
	TooLongError, TooShortError, RangeUnderflowError, RangeOverflowError,
	StepMismatchError, BadInputError,
};

/**
 * @see https://web.dev/articles/more-capable-form-controls
 */
export class AegisInput extends AegisComponent {
	#value;

	async [SYMBOLS.initialize]({
		role = 'textbox',
		...rest
	} = {}) {
		if (! (this[SYMBOLS.sanitizeValue] instanceof Function)) {
			throw new Error(`${this.tagName.toLowerCase()} does not have a [${SYMBOLS.setValue.toString()}] method.`);
		} else if (! this[SYMBOLS.initialized]) {
			const { shadow: s, internals: i } = await super[SYMBOLS.initialize]({
				role, ...rest,
			});

			protectedData.set(this, { shadow: s, internals: i });

			return { shadow: s, internals: i };
		}
	}

	get [Symbol.toStringTag]() {
		return 'AegisInput';
	}

	get form() {
		return getInternals(this).form;
	}

	get labels() {
		return getInternals(this).labels;
	}

	get willValidate() {
		return getInternals(this).willValidate;
	}

	get validity() {
		return getInternals(this).validity;
	}

	get validationMessage() {
		return getInternals(this).validationMessage;
	}

	get value() {
		return this.#value;
	}

	set value(value) {
		this.whenInitialized.then(async () => {
			const { internals, shadow } = protectedData.get(this);

			try {
				const result  = await this[SYMBOLS.sanitizeValue]({ value, internals, shadow });
				this.#value = result;
				internals.setFormValue(result);
				internals.setValidity({}, '');
				internals.ariaInvalid = 'false';
				internals.states.delete(STATES.invalid);
				internals.states.add(STATES.valid);
				this.removeAttribute('aria-errormessage');

				if (typeof result === 'string') {
					internals.ariaValueNow = result;
				}

				this.dispatchEvent(new Event(EVENTS.valid));
			} catch(error) {
				console.error(error);
				if (! (error instanceof AegisInputError)) {
					console.error(error);
					internals.setValidity({ customError: true });
				} else {
					error.setValidityOn(internals);
				}

				internals.states.add(STATES.invalid);
				internals.states.delete(STATES.valid);
				internals.ariaInvalid = 'true';
				this.setAttribute('aria-errormessage', error.message);
				this.dispatchEvent(new Event(EVENTS.invalid));
			}
		});
	}

	get name() {
		return getString(this, 'name');
	}

	set name(val) {
		setString(this, 'name', val);
	}

	get required() {
		return getBool(this, 'required');
	}

	set required(val) {
		setBool(this, 'required', val);

		whenInit(this, ({ internals }) => {
			if (this.required) {
				internals.ariaRequired = 'true';
				internals.states.add(STATES.required);
			} else {
				internals.ariaRequied = 'false';
				internals.states.delete(STATES.required);
			}
		});
	}

	get disabled() {
		return getBool(this, 'disabled');
	}

	set disabled(val) {
		setBool(this, 'disabled', val);

		whenInit(this, ({ internals }) => {
			if (this.disabled) {
				internals.ariaDisabled = 'true';
				internals.states.add(STATES.disabled);
			} else {
				internals.ariaDisabled = 'false';
				internals.states.delete(STATES.disabled);
			}
		});
	}

	get readOnly() {
		return getBool(this, 'readonly');
	}

	set readOnly(val) {
		setBool(this, 'readonly', val);
		whenInit(this, ({ internals }) => internals.ariaReadOnly = this.readOnly ? 'true' : 'false');
		whenInit(this, ({ internals }) => {
			if (this.readOnly) {
				internals.ariaReadOnly = 'true';
				internals.states.add(STATES.readOnly);
			} else {
				internals.ariaReadOnly = 'false';
				internals.states.delete(STATES.readOnly);
			}
		});
	}

	checkValidity() {
		return getInternals(this).checkValidity();
	}

	reportValidity() {
		return getInternals(this).reportValidity();
	}

	formAssociatedCallback(form){
		this.triggerUpdate(TRIGGERS.formAssociated, { form });
	}

	formDisabledCallback(disabled) {
		this.triggerUpdate(TRIGGERS.formDisabled, { disabled });
	}

	formResetCallback() {
		const internals = getInternals(this);
		this.triggerUpdate(TRIGGERS.formReset);
		internals.setFormValue('');
	}

	formStateRestoreCallback(state, mode) {
		this.triggerUpdate(TRIGGERS.formStateRestore, { state, mode });
	}

	static get formAssociated() {
		return true;
	}

	static get observedAttributes() {
		return [...AegisComponent.observedAttributes, 'required', 'disabled', 'readonly'];
	}
} 
