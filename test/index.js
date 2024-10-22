import { html } from '@aegisjsproject/core/parsers/html.js';
import { css } from '@aegisjsproject/core/parsers/css.js';
import { getUniqueSelector } from '@aegisjsproject/core/dom.js';
import { attachListeners } from '@aegisjsproject/core/events.js';
import { createPolicy } from '@aegisjsproject/core/trust.js';
import { reset } from '@aegisjsproject/styles/reset.js';
import { properties } from '@aegisjsproject/styles/properties.js';
import { btn, btnSuccess, btnDanger } from '@aegisjsproject/styles/button.js';
import { baseTheme, lightTheme, darkTheme } from '@aegisjsproject/styles/theme.js';
import { init } from '@aegisjsproject/router/router.js';
import { watchState } from '@aegisjsproject/state/state.js';
import { pages } from './consts.js';
import './components/dad-joke.js';
import './components/input-test.js';
import './components/aegis-log.js';
import './components/checkbox-test.js';
import './components/link.js';
import './components/counter.js';

init({
	'/product/:id': '@aegisjsproject/component/test/views/product.js',
	'/product/?q=:query': '@aegisjsproject/component/test/views/product-search.js',
	'/search': '@aegisjsproject/component/test/views/search.js',
	':path': '@aegisjsproject/component/test/views/test.js',
	'/test/': '@aegisjsproject/component/test/views/home.js',
}, {
	preload: true,
});

createPolicy('default', {
	createHTML: (input, config) => {
		const el = document.createElement('div');
		el.setHTML(input, config);
		return el.innerHTML;
	},
	createScript: () => trustedTypes.emptyScript,
});

const scope = getUniqueSelector();
watchState();

document.adoptedStyleSheets = [properties, reset, baseTheme, lightTheme, darkTheme, btn, btnSuccess, btnDanger, css`.${scope} {
	color: red;
}`];

customElements.whenDefined('aegis-link').then(AegisLink => {
	function createLink({ label, href, accessKey, state }) {
		const link = new AegisLink();
		link.href = href;
		link.textContent = label;
		link.classList.add('btn', 'btn-primary');

		if (typeof accessKey !== 'undefined') {
			link.accessKey = accessKey;
		}

		if (typeof state === 'object') {
			Object.entries(state).forEach(([key, val]) => link.dataset[key] = val);
		}

		return link;
	}

	document.getElementById('nav').append(...pages.map(createLink));
});


document.body.prepend(
	html`<header>
		<h1 class="${scope}">Hello, World!</h1>
	</header>`
);

attachListeners(document.body);
