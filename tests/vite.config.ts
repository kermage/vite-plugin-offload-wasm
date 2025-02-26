import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import offloadWasm from '../src/index';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',
	},
	plugins: [
		wasm(),
		offloadWasm({
			'tests/test.wasm': 'https://cdn.jsdelivr.net/gh/kermage/vite-plugin-offload-wasm/tests/test.wasm',
		}, true),
	],
});
