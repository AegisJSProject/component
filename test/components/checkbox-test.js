import { AegisCheckbox } from '@aegisjsproject/component/checkbox.js';
import { SYMBOLS } from '@aegisjsproject/component/consts.js';
import { html } from '@aegisjsproject/core/parsers/html.js';
import { css } from '@aegisjsproject/core/parsers/css.js';

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
	}
}

export class CheckboxTest extends AegisCheckbox {
	constructor() {
		super({ template, styles });
		this.addEventListener('click', toggleChecked);
		this.addEventListener('keydown', toggleChecked);
		this.tabIndex = '0';
	}

	async [SYMBOLS.render](type, data) {
		console.log({ el: this, type, ...data });
	}
}

CheckboxTest.register('checkbox-test');
