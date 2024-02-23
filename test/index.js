import { html, css, replaceStyles, getUniqueSelector, createPolicy } from '@shgysk8zer0/aegis';
import { reset } from '@shgysk8zer0/aegis-styles/reset.js';
import { baseTheme, lightTheme, darkTheme } from '@shgysk8zer0/aegis-styles/theme.js';
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
	html`<form id="testForm">
		<fieldset>
			<legend>Test Form</legend>
			<label for="${id}">Label</label>
		</fieldset>
		<div>
			<button type="submit">Submit</button>
			<button type="reset">Reset</button>
	</form>`,
);

const input = new InputTest();
input.name = 'test';
input.id = id;
document.querySelector('fieldset').append(input);
document.forms.testForm.addEventListener('submit', event => {
	event.preventDefault();
	const data = new FormData(event.target);
	console.log(data);
});
