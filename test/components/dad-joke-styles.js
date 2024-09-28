import { css } from '@aegisjsproject/core/parsers/css.js';

export const styles = css`:host {
	padding: 1.2rem;
	width: clamp(400px, 100%, 600px);
}

[part="joke"] {
	height: 4rem;
	overflow-y: auto;
}

::slotted(p) {
	margin: 0;
	font-family: var(--aegis-font, system-ui);
}

.icon {
	vertical-align: bottom;
	height: 1em;
	height: 1lh;
	width: auto;
}

.joke {
	padding: 1.3rem;
}`;
