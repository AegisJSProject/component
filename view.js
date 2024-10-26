import { AegisComponent } from './base.js';

const SYMBOLS = {
	title: Symbol.for('aegis:view:title'),
	description: Symbol.for('aegis:view:description'),
};

function createMeta(props = {}) {
	const meta = document.createElement('meta');

	Object.entries(props).forEach(([key, val]) => meta.setAttribute(key, val));
	return meta;
}

export class AegisView extends AegisComponent {
	#title;
	#description;

	constructor({
		title,
		description,
		clonable = false,
		serializable = false,
		mode = 'closed',
		...rest
	} = {}) {
		super({ clonable, serializable, mode, ... rest});

		if (typeof title !== 'undefined') {
			this[SYMBOLS.title] = title;
		}

		if (typeof description !== 'undefined') {
			this[SYMBOLS.description] = description;
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this.#updatePage({ title: true, description: true });
	}

	get [SYMBOLS.description]() {
		return this.#description;
	}

	set [SYMBOLS.description](val) {
		this.#description = val.toString();

		if (this.isConnected) {
			this.#updatePage({ description: true });
		}
	}

	get [SYMBOLS.title]() {
		return this.#title;
	}

	set [SYMBOLS.title](val) {
		this.#title = val.toString();

		if (this.isConnected) {
			this.#updatePage({ title: true });
		}
	}

	#updatePage({ title: udpateTitle = false, description: updateDescription = false } = {}) {
		const { [SYMBOLS.title]: title, [SYMBOLS.description]: description } = this;
		const head = this.ownerDocument.head;

		if (udpateTitle && typeof title === 'string') {
			this.ownerDocument.title = title;

			const ogTitle = head.querySelector('meta[property="og:title"]');
			const twitterTitle = head.querySelector('meta[name="twitter:title"]');

			if (ogTitle instanceof HTMLMetaElement) {
				ogTitle.replaceWith(createMeta({ property: 'og:title', content: title }));
			} else {
				head.append(createMeta({ property: 'og:title', content: title }));
			}

			if (twitterTitle instanceof HTMLMetaElement) {
				twitterTitle.replaceWith(createMeta({ name: 'twitter:title', content: title }));
			} else {
				head.append(createMeta({ name: 'twitter:title', content: title }));
			}
		}

		if (updateDescription && typeof description === 'string') {
			const descs = head.querySelectorAll('meta[name="description"], meta[itemprop="description"], meta[property="og:description"], meta[name="twitter:description"]');

			descs.forEach(meta => meta.remove());
			head.append(
				createMeta({ name: 'description', content: description }),
				createMeta({ itemprop: 'description', content: description }),
				createMeta({ property: 'og:description', content: description }),
				createMeta({ name: 'twitter:description', content: description }),
			);
		}
	}

	static get titleSymbol() {
		return SYMBOLS.title;
	}

	static get descriptionSymbol() {
		return SYMBOLS.description;
	}
}
