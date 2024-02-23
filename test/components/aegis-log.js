import { html } from '@shgysk8zer0/aegis';
import { AegisComponent, SYMBOLS } from '@shgysk8zer0/aegis-component';

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
