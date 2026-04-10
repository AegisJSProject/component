import { html } from '@aegisjsproject/core/parsers/html.js';
import { css } from '@aegisjsproject/core/parsers/css.js';
import { getUniqueSelector } from '@aegisjsproject/core/dom.js';
import { observeEvents } from '@aegisjsproject/core/events.js';
import { createPolicy } from '@aegisjsproject/core/trust.js';
import reset from '@aegisjsproject/styles/css/reset.css' with { type: 'css' };
import properties from '@aegisjsproject/styles/css/properties.css' with { type: 'css' };
import layers from '@aegisjsproject/styles/css/layers.css' with { type: 'css' };
import buttons from '@aegisjsproject/styles/css/button.css' with { type: 'css' };
import { baseTheme} from '@aegisjsproject/styles/theme.js';
import { init } from '@aegisjsproject/router/router.js';
import { watchState } from '@aegisjsproject/state/state.js';
import { pages } from './consts.js';
import './components/dad-joke.js';
import './components/input-test.js';
import './components/aegis-log.js';
// import './components/checkbox-test.js';
import './components/link.js';
import './components/counter.js';

init({
	'/product/:id': '@aegisjsproject/component/test/views/product.js',
	'/product/?q=:query': '@aegisjsproject/component/test/views/product-search.js',
	'/search': '@aegisjsproject/component/test/views/search.js',
	'/test/:path': '@aegisjsproject/component/test/views/test.js',
	'/test/': '@aegisjsproject/component/test/views/home.js',
}, {
	preload: true,
	rootEl: '#root',
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

document.adoptedStyleSheets = [layers, properties, reset, baseTheme, buttons, css`.${scope} {
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

document.documentElement.addEventListener('command', ({ command, source, currentTarget }) => {
	switch(command) {
		case '--theme':
			currentTarget.dataset.theme = source.dataset.setTheme;
			break;
	}
});

document.body.prepend(
	html`<header>
		<h1 class="${scope}">Hello, World!</h1>
	</header>`
);

observeEvents(document.body);
