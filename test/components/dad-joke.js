import { html } from '@aegisjsproject/core/parsers/html.js';
import { replace } from '@aegisjsproject/core/dom.js';
import { AegisComponent } from '@aegisjsproject/component/base.js';
import { TRIGGERS, SYMBOLS } from '@aegisjsproject/component/consts.js';
import { updateIcon } from '../icons.js';
import { styles } from './dad-joke-styles.js';
import { template } from './dad-joke-html.js';

class HTMLDataJokeElement extends AegisComponent {
	constructor() {
		super({ template, styles, exportParts: { joke: 'dad-joke', btn: 'refresh-joke-btn' }});
	}

	async [SYMBOLS.render](type, { shadow, signal, ...data }) {
		switch(type) {
			case TRIGGERS.constructed:
				// Also, for now, elements of a different namespace, such as `<svg>` are not supported
				shadow.getElementById('update-btn').append(updateIcon.cloneNode(true));
				break;

			case TRIGGERS.connected:
				this.update({ signal });
				break;

			default:
				console.log({ type, ...data });
		}
	}

	async update({ signal } = {}) {
		replace(this, html`<p slot="joke">${await HTMLDataJokeElement.getJoke({ signal })}</p>`);
	}

	static async getJoke({ signal } = {}) {
		const resp = await fetch('https://icanhazdadjoke.com', {
			headers: { Accept: 'text/plain' },
			referrerPolicy: 'no-referrer',
			crossOrigin: 'anonymous',
			signal,
		});

		return await resp.text();
	}
}

HTMLDataJokeElement.register('dad-joke');
