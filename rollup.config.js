import nodeResolve from '@rollup/plugin-node-resolve';

export default {
	input: 'component.js',
	external: src => src.startsWith('@aegisjsproject/'),
	output: {
		file: 'component.cjs',
		format: 'cjs',
	},
	plugins: [nodeResolve()],
};

