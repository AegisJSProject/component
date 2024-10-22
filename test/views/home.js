import { html } from '@aegisjsproject/core/parsers/html.js';
import { EVENTS } from '@aegisjsproject/core/events.js';

const [DadJoke, AegisLog] = await Promise.all([
	customElements.whenDefined('dad-joke'),
	customElements.whenDefined('aegis-log'),
]);

const id = crypto.randomUUID();

export default html`${new DadJoke()}
<aegis-counter></aegis-counter>
${new AegisLog()}
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
</form>`;
