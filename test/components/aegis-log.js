import { html } from '@aegisjsproject/core/parsers/html.js';
import { AegisComponent } from '@aegisjsproject/component/base.js';
import { SYMBOLS } from '@aegisjsproject/component/consts.js';

class AegisLog extends AegisComponent {
	constructor() {
		super({
			mode: 'open',
			exportParts: 'list',
			template: '<ol part="list" id="list"></ol>',
			styles: 'li {color:red;}',
		});
	}

	async [SYMBOLS.render](type, { timestamp, shadow }) {
		shadow.getElementById('list').append(html`<li>${type} @ ${timestamp}ms</li>`);
	}
}

AegisLog.register('aegis-log');
