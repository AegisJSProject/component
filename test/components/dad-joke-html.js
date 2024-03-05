import { html } from '@aegisjsproject/core/parsers/html.js';
import { EVENTS, AEGIS_EVENT_HANDLER_CLASS } from '@aegisjsproject/core/events.js';
import { registerCallback } from '@aegisjsproject/core/callbackRegistry.js';
import { updateIcon } from '../icons.js';

const update = registerCallback('dad-joke:update', event => event.target.getRootNode().host.update());

const template = html`<div part="container">
	<div part="joke">
		<slot name="joke">Loading...</slot>
	</div>
	<button type="button" id="update-btn" ${EVENTS.onClick}="${update}" class="btn btn-primary ${AEGIS_EVENT_HANDLER_CLASS}" part="btn" autofocus="">
		<span>Get new Dad Joke</span>
	</button>
</div>`;

// For now, elements of a different namespace, such as `<svg>` are not supported
template.getElementById('update-btn').append(updateIcon.cloneNode(true));

export { template };
