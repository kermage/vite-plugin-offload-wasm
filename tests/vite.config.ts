import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import offloadWasm from '../src/index';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		wasm(),
		topLevelAwait(),
		offloadWasm({
			'tests/test.wasm': 'https://cdn.jsdelivr.net/gh/kermage/vite-plugin-offload-wasm/tests/test.wasm',
		}),
	],
});
