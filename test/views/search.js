import { html } from '@aegisjsproject/core/parsers/html.js';
// import { manageState } from '@aegisjsproject/state/state.mjs';
import { registerCallback } from '@aegisjsproject/core/callbackRegistry.js';
import { EVENTS } from '@aegisjsproject/core/events.js';
import { manageSearch } from '@aegisjsproject/router/router.js';

const [search, setSearch] = manageSearch('q');
const updateSearch = registerCallback('search:change', ({ target }) => setSearch(target.value));
// const [search, setSearch] = manageState('search:query', '');
// const updateSearch = registerCallback('search:change', ({ target }) => setSearch(target.value));

export default () => {
	console.log(search - 0);
	const tmp = html`<form method="GET" id="search">
		<label for="q">Search for...</label>
		<input type="search" name="q" id="q" placeholder="Search term" ${EVENTS.onChange}="${updateSearch}" value="${search}" required="" />
		<button type="submit" class="btn btn-primary">Search</button>
	</form>`;

	// Sanitizer does not permit `action`, so set here
	tmp.getElementById('search').action = '/product/';
	return tmp;
};
