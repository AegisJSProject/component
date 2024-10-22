import { AegisCheckbox } from '@aegisjsproject/component/checkbox.js';
import { SYMBOLS, TRIGGERS } from '@aegisjsproject/component/consts.js';
import { html } from '@aegisjsproject/core/parsers/html.js';
import { css } from '@aegisjsproject/core/parsers/css.js';
import { getState, setState } from '@aegisjsproject/state/state.js';

const template = html`<slot name="tick"><span part="tick" class="tick"></span></slot>`;
const styles = css`
:host {
	display: inline-block;
	width: 24px;
	height: 24px;
	border: 6px solid black;
	border-radius: 4px;
	background-color: white;
	cursor: pointer;
}

:host([disabled]), :host([readonly]) {
	cursor: auto;
}

:host(:not([checked])) ::slotted([slot="tick"]), :host(:not([checked])) .tick {
	display: none;
}

:host .tick {
	background-color: gray;
	display: inline-block;
	width: 100%;
	height: 100%;
}`;

function toggleChecked({ type, key, currentTarget }) {
	if (! (currentTarget.disabled || currentTarget.readOnly || (type === 'keydown' && key !== ' '))) {
		currentTarget.checked = ! currentTarget.checked;
		setState('aegis:checkbox', currentTarget.checked);
	}
}

export class CheckboxTest extends AegisCheckbox {
	constructor() {
		super({ template, styles });
		this.addEventListener('click', toggleChecked);
		this.addEventListener('keydown', toggleChecked);
		this.tabIndex = '0';
		this.checked = getState('aegis:checkbox', false);
	}

	async [SYMBOLS.render](type, data) {
		switch (type) {
			case TRIGGERS.stateChanged:
				this.checked = data['aegis:checkbox'];
				break;
		}
		// console.log({ el: this, type, ...data });
	}

	static get [SYMBOLS.observeStates]() {
		return ['aegis:checkbox'];
	}
}

CheckboxTest.register('checkbox-test');
