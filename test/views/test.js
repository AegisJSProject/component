import { html } from '@aegisjsproject/core/parsers/html.js';
import { manageState } from '@aegisjsproject/state/state.mjs';
import { registerCallback } from '@aegisjsproject/core/callbackRegistry.js';
import { EVENTS } from '@aegisjsproject/core/events.js';

const [open, setOpen] = manageState('test:details:open', false);
const toggleOpen = registerCallback('test:details:toggle', ({ newState }) => setOpen(newState === 'open'));

export default (params) => html`<div class="container">
	<aegis-counter></aegis-counter>
	<details ${EVENTS.onToggle}="${toggleOpen}" ${open.valueOf() ? ' open=""' : ''}>
		<summary>Request Details</summary>
		<pre><code>${JSON.stringify(params, null, 4)}</code></pre>
	</details>
</div>`;
