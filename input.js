import { AegisComponent } from './base.js';
import { TRIGGERS, SYMBOLS } from './consts.js';
import { getBool, setBool, getString, setString } from './attrs.js';

const protectedData = new WeakMap();

const getInternals = target => protectedData.get(target).internals;

const getShadow = target => protectedData.get(target).shadow;

/**
 * @see https://web.dev/articles/more-capable-form-controls
 */
export class AegisInput extends AegisComponent {
	#value;

	async [SYMBOLS.initialize]({
		role = 'textbox',
		mode = 'closed',
		clonable = false,
		delegatesFocus = true,
		slotAssignment = 'named',
		shadow,
		internals,
	} = {}) {
		if (! (this[SYMBOLS.setValue] instanceof Function)) {
			throw new Error(`${this.tagName.toLowerCase()} does not have a [${SYMBOLS.setValue.toString()}] method.`);
		} else if (! this[SYMBOLS.initialized]) {
			const { shadow: s, internals: i } = await super[SYMBOLS.initialize]({
				role, mode, clonable, delegatesFocus, slotAssignment, shadow, internals,
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
		this[SYMBOLS.setValue]({
			value,
			internals: getInternals(this),
			shadow: getShadow(this),
		}).then(result => this.#value = result, console.error);
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
		getInternals(this).ariaRequired = this.required ? 'true' : 'false';
	}

	get disabled() {
		return getBool(this, 'disabled');
	}

	set disabled(val) {
		setBool(this, 'disabled', val);
		getInternals(this).ariaDisabled = this.disabled ? 'true' : 'false';
	}

	get readOnly() {
		return getBool(this, 'readonly');
	}

	set readOnly(val) {
		setBool(this, 'readonly', val);
		getInternals(this).ariaReadOnly = this.readOnly ? 'true' : 'false';
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
