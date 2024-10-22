import { navigate } from '@aegisjsproject/router/router.js';

export default ({ url }) => {
	navigate(`/product/${crypto.randomUUID()}`, { productName: url.matches.search.groups.query });
	const el = document.createElement('p');
	el.textContent = 'Redirecting';
	return el;
};
