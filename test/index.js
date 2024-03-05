import { html } from '@aegisjsproject/core/parsers/html.js';
import { css } from '@aegisjsproject/core/parsers/css.js';
import { getUniqueSelector, replaceStyles } from '@aegisjsproject/core/dom.js';
import { attachListeners, EVENTS, AEGIS_EVENT_HANDLER_CLASS } from '@aegisjsproject/core/events.js';
import { createCallback } from '@aegisjsproject/core/callbackRegistry.js';
import { createPolicy } from '@aegisjsproject/core/trust.js';
import { reset } from '@aegisjsproject/styles/reset.js';
import { baseTheme, lightTheme, darkTheme } from '@aegisjsproject/styles/theme.js';
import './components/dad-joke.js';
import './components/input-test.js';
import './components/aegis-log.js';

createPolicy('default', {
	createHTML: input => {
		const el = document.createElement(input);
		el.setHTML(input);
		return el.innerHTML;
	},
	createScript: () => trustedTypes.emptyScript,
});

const scope = getUniqueSelector();

replaceStyles(document, reset, baseTheme, lightTheme, darkTheme, css`.${scope} {
	color: red;
}`);

const [DadJoke, InputTest, AegisLog] = await Promise.all([
	customElements.whenDefined('dad-joke'),
	customElements.whenDefined('input-test'),
	customElements.whenDefined('aegis-log'),
]);

const id = crypto.randomUUID();

document.body.append(
	html`<header>
		<h1 class="${scope}">Hello, World!</h1>
	</header>`,
	new DadJoke(),
	new AegisLog(),
	new DadJoke(),
	attachListeners(html`<form id="testForm" class="${AEGIS_EVENT_HANDLER_CLASS}" ${EVENTS.onSubmit}="${createCallback(event => {
		event.preventDefault();
		const data = new FormData(event.target);
		console.log(data);
	})}">
		<fieldset>
			<legend>Test Form</legend>
			<label for="${id}">Label</label>
		</fieldset>
		<div>
			<button type="submit">Submit</button>
			<button type="reset">Reset</button>
	</form>`),
);

const input = new InputTest();
input.name = 'test';
input.id = id;
input.required = true;
input.minLength = 10;
input.maxLength = 12;
document.querySelector('fieldset').append(input);
