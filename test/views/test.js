import { html } from '@aegisjsproject/core/parsers/html.js';

export default (params) => html`<div class="container">
	<aegis-counter></aegis-counter>
	<details>
		<summary>Request Details</summary>
		<pre><code>${JSON.stringify(params, null, 4)}</code></pre>
	</details>
</div>`;
