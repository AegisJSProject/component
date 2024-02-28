import { html } from '@aegisjsproject/core';
import { AegisComponent, SYMBOLS } from '@aegisjsproject/component';

class AegisLog extends AegisComponent {
	constructor() {
		super({ mode: 'open' });

		this.shadowRoot.append(html`<ol part="list" id="list"></ol>`);
	}

	async [SYMBOLS.render](type, { timestamp, shadow, ...rest }) {
		console.log({ type, timestamp, ...rest });
		shadow.getElementById('list').append(html`<li>${type} @ ${timestamp}</li>`);
	}
}

AegisLog.register('aegis-log');
