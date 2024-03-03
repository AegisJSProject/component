import { html } from '@aegisjsproject/core/parsers/html.js';
import { EVENTS, AEGIS_EVENT_HANDLER_CLASS } from '@aegisjsproject/core/events.js';
import { registerCallback } from '@aegisjsproject/core/callbackRegistry.js';

const update = registerCallback('dad-joke:update', event => event.target.getRootNode().host.update());

export const template = html`<div part="container">
	<div part="joke">
		<slot name="joke">Loading...</slot>
	</div>
	<button type="button" id="update-btn" ${EVENTS.onClick}="${update}" class="btn btn-primary ${AEGIS_EVENT_HANDLER_CLASS}" part="btn" autofocus="">
		<span>Get new Dad Joke</span>
	</button>
</div>`;
