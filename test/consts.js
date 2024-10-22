export const pages = [{
	label: 'Home',
	href: './',
	accessKey: 'h',
}, {
	label: 'Test',
	href: './test',
	accessKey: 't',
	state: {
		foo: 'bar',
		num: 42,
	}
}, {
	label: 'Product 1',
	href: '/product/e0d55e43-9f46-4f7e-b922-a4a4abdaba9e',
	accessKey: '1',
	state: {
		productName: 'Product 1',
	}
}, {
	label: 'Product 2',
	href: '/product/75c674f8-ff39-426c-898e-79c06f375005',
	accessKey: '2',
	state: {
		productName: 'Product 2',
	}
}, {
	label: 'Product 3',
	href: '/product/3fcf7d5c-25ab-43a9-a75e-e5ca1706b82e',
	accessKey: '3',
	state: {
		productName: 'Product 3',
	}
}, {
	label: 'Product Search',
	href: '/search',
	accessKey: '?',
}];
