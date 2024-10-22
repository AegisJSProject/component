import { AegisComponent } from '@aegisjsproject/component/base.js';
import { SYMBOLS, TRIGGERS } from '@aegisjsproject/component/consts.js';
import { manageState } from '@aegisjsproject/state/state.js';
import { EVENTS } from '@aegisjsproject/core/events.js';
import { registerCallback } from '@aegisjsproject/core/callbackRegistry.js';

const [count, setCount] = manageState('count', 0);
const increment = registerCallback('counter:increment', () => setCount(count + 1));
const decrement = registerCallback('counter:decrement', () => setCount(count - 1));

class AegisCounterElement extends AegisComponent {
	constructor() {
		super({
			template: `<div part="container">
				<p>The current count is <span id="count">${count}</slot></p>
				<button type="button" ${EVENTS.onClick}="${increment}" class="btn btn-primary" accesskey="+">Increment</button>
				<button type="button" ${EVENTS.onClick}="${decrement}" class="btn btn-warning" accesskey="-">Decrement</button>
			</div>`
		});
	}

	async [SYMBOLS.render](type, { diff = [], shadow }) {
		switch(type) {
			case TRIGGERS.stateChanged:
				if (diff.includes('count')) {
					shadow.getElementById('count').textContent = count;
				}
				break;
		}
	}

	static get [SYMBOLS.observeStates]() {
		return ['count'];
	}
}

AegisCounterElement.register('aegis-counter');
