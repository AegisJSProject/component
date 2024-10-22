import { navigate } from '@aegisjsproject/router/router.js';
import { registerComponent } from '@aegisjsproject/core/componentRegistry.js';

const styles = Promise.all([
	new CSSStyleSheet().replace(`:host {
			cursor: pointer;
			color: var(--aegis-link-color, rgb(0, 123, 255));
			text-decoration: underline;
		}

		:host:state(--disabled) {
			cursor: initial;
		}

		:slotted(*) {
			text-decoration: underline;
			color: inherit;
	}`),
]);

const clickHandler = ({ currentTarget, type, key }) => {
	const state = { ...history.state ?? {}, ...Object.fromEntries(Object.entries(currentTarget.dataset))};

	if (! currentTarget.disabled) {
		switch(type) {
			case 'click':
				navigate(currentTarget.url, state);
				break;

			case 'keydown':
				if (key === 'Enter' || key === ' ') {
					navigate(currentTarget.url, state);
				}
				break;
		}
	}
};

class AegisLinkElement extends HTMLElement {
	#internals;
	#shadow;

	constructor() {
		super();
		this.#shadow = this.attachShadow({ mode: 'closed' });
		this.#shadow.append(document.createElement('slot'));
		this.#internals = this.attachInternals();
		this.#internals.role = 'link';

		styles.then(sheets => this.#shadow.adoptedStyleSheets = sheets);
	}

	connectedCallback() {
		if (! this.hasAttribute('tabindex')) {
			this.setAttribute('tabindex', '0');
		}

		this.addEventListener('click', clickHandler, { passive: true });
		this.addEventListener('keydown', clickHandler, { passive: true });
	}

	disconnectedCallback() {
		this.removeEventListener('click', clickHandler);
		this.removeEventListener('keydown', clickHandler);
	}

	attributeChangedCallback(name, oldVal, newVal) {
		switch(name) {
			case 'disabled':
				if (typeof newVal === 'string') {
					this.#internals.states.add('--disabled');
				} else {
					this.#internals.states.delete('--disabled');
				}
				break;

			default:
				throw new TypeError(`Unhandled attribute change: "${name}.`);
		}
	}

	get [Symbol.for('states')]() {
		return [...this.#internals.states.values()];
	}

	get disabled() {
		return this.hasAttribute('disabled');
	}

	set disabled(val) {
		this.toggleAttribute('disabled', val);
	}

	get href() {
		return this.url.href;
	}

	set href(val) {
		this.setAttribute('href', val);
	}

	get url() {
		if (this.hasAttribute('href')) {
			return new URL(this.getAttribute('href'), document.baseURI);
		} else {
			return URL.parse(document.baseURI);
		}
	}

	static get observedAttributes() {
		return ['disabled'];
	}
}

registerComponent('aegis-link', AegisLinkElement);
