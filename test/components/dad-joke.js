import { html } from '@aegisjsproject/core/parsers/html.js';
import { replace } from '@aegisjsproject/core/dom.js';
import { AegisComponent } from '@aegisjsproject/component/base.js';
import { componentBorder } from '@aegisjsproject/styles/theme.js';
import { TRIGGERS, SYMBOLS } from '@aegisjsproject/component/consts.js';
import { styles } from './dad-joke-styles.js';
import { template } from './dad-joke-html.js';

class HTMLDadJokeElement extends AegisComponent {
	constructor() {
		super({
			template,
			styles: [componentBorder, styles],
			exportParts: { joke: 'dad-joke', btn: 'refresh-joke-btn' },
		});
	}

	async [SYMBOLS.render](type, { signal }) {
		switch(type) {
			case TRIGGERS.connected:
				await this.update({ signal });
				break;
		}
	}

	async update({ signal } = {}) {
		const joke = await HTMLDadJokeElement.getJoke({ signal });
		replace(this, html`<p slot="joke">${joke}</p>`);
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

HTMLDadJokeElement.register('dad-joke');
