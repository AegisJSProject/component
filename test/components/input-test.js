import { AegisInput } from '@shgysk8zer0/aegis-component/input.js';
import { TRIGGERS, SYMBOLS } from '@shgysk8zer0/aegis-component/consts.js';
import { html } from '@shgysk8zer0/aegis';

class TestInput extends AegisInput {
	async [SYMBOLS.setValue]({ value, internals }) {
		internals.setFormValue(value);
		return value;
	}

	async [SYMBOLS.render](type, { shadow, internals, ...data }) {
		switch(type) {
			case TRIGGERS.connected:
				shadow.append(html`<div id="content" contenteditable="true">Type Some Stuff!</div>`);

				shadow.getElementById('content').addEventListener('input', event => {
					this.value = event.target.innerHTML;
				});
				break;

			case TRIGGERS.formReset:
				shadow.getElementById('content').textContent = ' ';
				break;

			case TRIGGERS.attributeChanged:
				if (data.name === 'readonly') {
					shadow.getElementById('content').contentEditable = this.readOnly ? 'false' : 'true';
				}
				break;

			case TRIGGERS.formDisabled:
				shadow.getElementById('content').contentEditable = data.disabled ? 'false' : 'true';
				break;

			case TRIGGERS.valueChanged:
				if (data.value.includes('<')) {
					const anchor = shadow.getElementById('content');
					console.log({ anchor });
					internals.setValidity({
						badInput: true,
					}, 'Must not contain HTML', anchor);
				} else {
					internals.setFormValue(data.value);
					internals.setValidity({});
				}
		}
	}
}

TestInput.register('input-test');
