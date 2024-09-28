import { html } from '@aegisjsproject/core/parsers/html.js';
import { css } from '@aegisjsproject/core/parsers/css.js';
import { getUniqueSelector, replaceStyles } from '@aegisjsproject/core/dom.js';
import { attachListeners, EVENTS } from '@aegisjsproject/core/events.js';
import { createPolicy } from '@aegisjsproject/core/trust.js';
import { reset } from '@aegisjsproject/styles/reset.js';
import { properties } from '@aegisjsproject/styles/properties.js';
import { btn, btnSuccess, btnDanger } from '@aegisjsproject/styles/button.js';
import { baseTheme, lightTheme, darkTheme } from '@aegisjsproject/styles/theme.js';
import './components/dad-joke.js';
import './components/input-test.js';
import './components/aegis-log.js';
import './components/checkbox-test.js';

createPolicy('default', {
	createHTML: input => {
		const el = document.createElement(input);
		el.setHTML(input);
		return el.innerHTML;
	},
	createScript: () => trustedTypes.emptyScript,
});

const scope = getUniqueSelector();

replaceStyles(document, properties, reset, baseTheme, lightTheme, darkTheme, btn, btnSuccess, btnDanger, css`.${scope} {
	color: red;
}`);

const [DadJoke, AegisLog] = await Promise.all([
	customElements.whenDefined('dad-joke'),
	customElements.whenDefined('aegis-log'),
	customElements.whenDefined('input-test'),
	customElements.whenDefined('checkbox-test'),
]);

const id = crypto.randomUUID();

document.body.append(attachListeners(
	html`<header>
		<h1 class="${scope}">Hello, World!</h1>
	</header>
	${new DadJoke()}
	${new AegisLog()}
	<dad-joke></dad-joke>
	<form id="testForm" ${EVENTS.onSubmit}="${event => {
	event.preventDefault();
	const data = new FormData(event.target);
	console.log(data);
}}">
		<fieldset>
			<legend>Test Form</legend>
			<div>
				<label for="${id}">Label</label>
				<input-test name="test" id="${id}" minlength="10" maxlength="25" required=""></input-test>
			</div>
			<div>
				<label for="check">Checkbox</label>
				<checkbox-test id="check" name="check" value="checked" required=""><span slot="tick">X</span></checkbox-test>
		</fieldset>
		<div>
			<button type="submit" class="btn btn-success">Submit</button>
			<button type="reset" class="btn btn-danger">Reset</button>
	</form>`),
);
