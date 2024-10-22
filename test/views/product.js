import { SYMBOLS, TRIGGERS } from '@aegisjsproject/component/consts.js';
import { AegisView } from '@aegisjsproject/component/view.js';
class AegisProductView extends AegisView {
	#params;

	constructor({
		state: { productName = 'Unknown Product' },
		url,
		...params
	} = {}) {
		super({
			template: `
				<h1>Poduct Details for <span id="name">${productName}</span></h1>
				<details>
					<summary>Request Details</summary>
					<pre><code><slot name="data">Loading...</slot></code></pre>
				</details>
			`,
			title: `Product Details for ${url.matches.pathname.groups.id}`,
			description: `Product Details Pagefor ${url.matches.pathname.groups.id}`,
		});

		this.#params = params;

		this.dataset.productId = url.matches.pathname.groups.id;
	}

	async [SYMBOLS.render](type, { state, shadow, diff }) {
		if (type === TRIGGERS.connected) {
			const el = document.createElement('span');
			el.slot = 'data';
			el.textContent = JSON.stringify(this.#params, null, 4);
			this.replaceChildren(el);
		} else if (type === TRIGGERS.stateChanged) {
			if (diff.includes('productName')) {
				shadow.getElementById('name').textContent = state.productName ?? 'Unknown Product';
			}
		} else {
			console.log({ type, state });
		}
	}

	static get [SYMBOLS.observeStates]() {
		return ['productName', 'product:title', 'product:description'];
	}
}

AegisProductView.register('aegis-product');

export default AegisProductView;
