import nodeResolve from '@rollup/plugin-node-resolve';

export default {
	input: 'component.js',
	output: {
		file: 'component.cjs',
		format: 'cjs',
	},
	plugins: [nodeResolve()],
};

