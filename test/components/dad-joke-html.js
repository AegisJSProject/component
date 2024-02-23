import { html } from '@shgysk8zer0/aegis';

export const template = html`<div part="container">
	<div part="joke">
		<slot name="joke">Loading...</slot>
	</div>
	<button type="button" id="update-btn" class="btn btn-primary" part="btn">
		<span>Get new Dad Joke</span>
	</button>
</div>`;
