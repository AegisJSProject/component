import { reset } from '@aegisjsproject/styles/reset.js';
import { componentBase, componentDarkTheme, componentLightTheme } from '@aegisjsproject/styles/theme.js';
import { btn } from '@aegisjsproject/styles/button.js';
import { SYMBOLS, TRIGGERS, EVENTS, STATES } from './consts.js';

const observed = new WeakMap();

const observer = new IntersectionObserver((entries) => {
	entries.forEach(({ target, isIntersecting }) => {
		if (isIntersecting && observed.has(target)) {
			observed.get(target).resolve();
			observed.delete(target);
			observer.unobserve(target);
		}
	});
}, {
	rootMargin: `${Math.min(250, Math.floor(screen.height * 0.3))}px`,
});

async function whenIntersecting(el) {
	if (el.loading === 'lazy' && observed.has(el)) {
		await observed.get(el).promise;
	}
}

export class AegisComponent extends HTMLElement {
	#shadow;
	#internals;
	#initialized;
	#initPromise;

	constructor({
		role = 'document',
		mode = 'closed',
		clonable = false,
		delegatesFocus = false,
		slotAssignment = 'named',
	} = {}) {
		super();
		this.#initialized = false;
		this.#initPromise = Promise.withResolvers();

		if (typeof mode === 'string') {
			this[SYMBOLS.initialize]({ mode, role, clonable, delegatesFocus, slotAssignment });
		}
	}

	[SYMBOLS.initialize]({
		role = 'document',
		mode = 'closed',
		clonable = false,
		delegatesFocus = false,
		slotAssignment = 'named',
		callback,
		shadow,
		internals,
	} = {}) {
		if (this.#initialized) {
			throw new DOMException('Already initialized.');
		} else if (! (this[SYMBOLS.render] instanceof Function)) {
			throw new Error(`${this.tagName.toLowerCase()} does not have a [${SYMBOLS.render.toString()}] method.`);
		} else {
			try {
				if (shadow instanceof ShadowRoot) {
					this.#shadow = shadow;
				} else {
					this.#shadow = this.attachShadow({ mode, clonable, delegatesFocus, slotAssignment });
				}

				if (internals instanceof ElementInternals) {
					this.#internals = internals;
				} else {
					this.#internals = this.attachInternals();
				}

				this.#internals.role = role;
				this.#internals.states.add(STATES.loading);

				if (callback instanceof Function) {
					callback.call(this, {
						internals: this.#internals,
						shadow: this.#shadow,
						target: this,
					});
				}

				this.#shadow.adoptedStyleSheets = [reset, btn, componentBase, componentDarkTheme, componentLightTheme];

				this.#shadow.addEventListener('slotchange', event => {
					event.stopPropagation();
					event.stopImmediatePropagation();

					if (event.isTrusted) {
						this.triggerUpdate(TRIGGERS.slotChanged, {
							target: event.target,
							name: event.target.name,
							assigned: event.target.assignedNodes(),
						});
					}
				});

				matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ target, isTrusted }) => {
					if (isTrusted) {
						this.triggerUpdate(TRIGGERS.colorSchemeChanged, {
							mediaQuery: target,
							matches: target.matches,
							media: target.media,
						});
					}
				});

				this.#initialized = true;

				this.triggerUpdate(TRIGGERS.constructed);
				this.#internals.states.add(STATES.initialized);
				this.#internals.states.delete(STATES.loading);

				this.#initPromise.resolve();
				return { internals: this.#internals, shadow: this.#shadow };
			} catch (err) {
				this.#initPromise.reject(err);
			}
		}
	}

	[SYMBOLS.hasState](state) {
		return this.#internals instanceof ElementInternals && this.#internals.states.has(state);
	}

	get [Symbol.toStringTag]() {
		return 'AegisComponent';
	}

	get [SYMBOLS.getStates]() {
		return Array.from(this.#internals.states.values());
	}

	get [SYMBOLS.initialized]() {
		return this.#initialized;
	}

	async connectedCallback() {
		await whenIntersecting(this);
		this.dispatchEvent(new Event(EVENTS.connected));
		await this.triggerUpdate(TRIGGERS.connected);
	}

	async disconnectedCallback() {
		this.dispatchEvent(new Event(EVENTS.disconnected));
		await this.triggerUpdate(TRIGGERS.disconnected);
	}

	async adoptedCallback() {
		this.dispatchEvent(new Event(EVENTS.adopted));
		await this.triggerUpdate(TRIGGERS.adopted);
	}

	async attributeChangedCallback(name, oldValue, newValue) {
		// Do not trigger render if not connected

		if (name === 'loading') {
			switch (newValue.toLowerCase()) {
				case 'lazy':
					observed.set(this, Promise.withResolvers());
					observer.observe(this);
					break;

				case 'eager':
				case 'auto':
					if (observed.has(this)) {
						observed.get(this).resolve();
					}

					observed.delete(this);
					observer.unobserve(this);
					break;
			}
		}

		if (this.isConnected && oldValue !== newValue) {
			await this.triggerUpdate(TRIGGERS.attributeChanged, { name, oldValue, newValue });
		}
	}

	async triggerUpdate(type = TRIGGERS.unknown, data = {}, { signal } = {}) {
		await new Promise((resolve, reject) => {
			if (signal instanceof AbortSignal && signal.aborted) {
				reject(signal.reason);
			} else {
				const controller = new AbortController();

				const af = requestAnimationFrame(async timestamp => {
					this.#internals.ariaBusy = 'true';

					try {
						const result = await this[SYMBOLS.render](type, {
							...data,
							state: history.state ?? {},
							url: new URL(location.href),
							shadow: this.#shadow,
							internals: this.#internals,
							styleSheets: this.#shadow.adoptedStyleSheets,
							signal,
							timestamp,
						});

						resolve(result);
					} catch(err) {
						reject(err);
					} finally {
						this.#internals.ariaBusy = 'false';
						controller.abort();
					}
				});

				if (signal instanceof AbortSignal) {
					signal.addEventListener('abort', ({ target })  => {
						reject(target.reason);
						cancelAnimationFrame(af);
						controller.abort(target.reason);
					}, {
						once: true,
						signal: controller.signal,
					});
				}
			}
		});
	}

	get whenConnected() {
		return new Promise(resolve => {
			if (this.isConnected) {
				resolve();
			} else {
				this.addEventListener(EVENTS.connected, () => resolve(), { once: true });
			}
		});
	}

	get whenInitialized() {
		return this.#initPromise.promise;
	}

	get loading() {
		if (this.hasAttribute('loading')) {
			return this.getAttribute('loading');
		} else {
			return 'auto';
		}
	}

	set loading(val) {
		if (typeof val === 'string' && val.length !== 0) {
			this.setAttribute('loading', val);
		} else {
			this.removeAttribute('loading');
		}
	}

	get theme() {
		if (this.hasAttribute('theme')) {
			return this.getAttribute('theme');
		} else {
			return 'auto';
		}
	}

	set theme(val) {
		if (typeof val === 'string' && val.length !== 0) {
			this.setAttribute('theme', val);
		} else {
			this.removeAttribute('theme');
		}
	}

	static get observedAttributes() {
		return ['theme', 'loading'];
	}

	static register(tag, opts = {}) {
		customElements.define(tag, this, opts);
	}

	static async whenDefined(tag) {
		return await customElements.whenDefined(tag);
	}
}
