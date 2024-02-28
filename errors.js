export class AegisInputError extends Error {
	#anchor;

	constructor(message, { cause, anchor } = {}) {
		super(message, { cause });

		if (anchor instanceof Element) {
			this.#anchor = anchor;
		}
	}

	setValidityOn(internals) {
		if (internals instanceof ElementInternals) {
			internals.setValidity({ [this.type]: true }, this.message, this.#anchor);
		} else {
			throw new TypeError('internals must be an instance of `ElementInternals`.');
		}
	}
}

export class ValueMissingError extends AegisInputError {
	get type() {
		return 'valueMissing';
	}
}

export class TypeMismatchError extends AegisInputError {
	get type() {
		return 'typeMissmatch';
	}
}

export class PatternMismatchError extends AegisInputError {
	get type() {
		return 'patternMismatch';
	}
}

export class TooLongError extends AegisInputError {
	get type() {
		return 'tooLong';
	}
}

export class TooShortError extends AegisInputError {
	get type() {
		return 'tooShort';
	}
}

export class RangeUnderflowError extends AegisInputError {
	get type() {
		return 'rangeUnderflow';
	}
}

export class RangeOverflowError extends AegisInputError {
	get type() {
		return 'rangeOverflow';
	}
}

export class StepMismatchError extends AegisInputError {
	get type() {
		return 'stepMismatch';
	}
}

export class BadInputError extends AegisInputError {
	get type() {
		return 'badInput';
	}
}

export class CustomError extends AegisInputError {
	get type() {
		return 'customError';
	}
}
