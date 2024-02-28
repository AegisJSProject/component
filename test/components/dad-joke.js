import { html, replace, addStyles, appendTo } from '@aegisjsproject/core';
import { AegisComponent } from '@aegisjsproject/component/component.js';
import { TRIGGERS, SYMBOLS } from '@aegisjsproject/component/consts.js';
import { updateIcon } from '../icons.js';
import { styles } from './dad-joke-styles.js';
import { template } from './dad-joke-html.js';

class HTMLDataJokeElement extends AegisComponent {
	async [SYMBOLS.render](type, { shadow, signal, ...data }) {
		switch(type) {
			case TRIGGERS.constructed:
				addStyles(shadow, styles);
				appendTo(shadow, template.cloneNode(true));

				// Cannot add listeners or `on*` attributes using `html`
				shadow.getElementById('update-btn').addEventListener('click', () => this.triggerUpdate('click'));

				// Also, for now, elements of a different namespace, such as `<svg>` are not supported
				shadow.getElementById('update-btn').append(updateIcon.cloneNode(true));
				break;

			case TRIGGERS.connected:
			case 'click':
				replace(this, html`<p slot="joke">${await HTMLDataJokeElement.getJoke({ signal })}</p>`);
				break;

			case TRIGGERS.colorSchemeChanged:
			case TRIGGERS.attributeChanged:
			case TRIGGERS.slotChanged:
				console.log({ type, ...data });
				break;

			default:
				throw new DOMException(`Unhandled render trigger: "${type}".`);

		}
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
