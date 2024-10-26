import { navigate } from '@aegisjsproject/router/router.js';

export default ({ matches }) => {
	navigate(`/product/${crypto.randomUUID()}`, { productName: matches.search.groups.query });
	const el = document.createElement('p');
	el.textContent = 'Redirecting';
	return el;
};
