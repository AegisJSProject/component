import { html } from '@aegisjsproject/core/parsers/html.js';

export default () => {
	const tmp = html`<form method="GET" id="search">
		<label for="q">Search for...</label>
		<input type="search" name="q" id="q" placeholder="Search term" required="" />
		<button type="submit" class="btn btn-primary">Search</button>
	</form>`;

	tmp.getElementById('search').action = '/product/';
	return tmp;
};
