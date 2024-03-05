import { html } from '@aegisjsproject/core/parsers/html.js';
import { replace } from '@aegisjsproject/core/dom.js';
import { AegisComponent } from '@aegisjsproject/component/base.js';
import { TRIGGERS, SYMBOLS } from '@aegisjsproject/component/consts.js';
import { styles } from './dad-joke-styles.js';
import { template } from './dad-joke-html.js';

class HTMLDataJokeElement extends AegisComponent {
	constructor() {
		super({
			template,
			styles,
			exportParts: { joke: 'dad-joke', btn: 'refresh-joke-btn' },
		});
	}

	async [SYMBOLS.render](type, { signal, ...data }) {
		switch(type) {
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
