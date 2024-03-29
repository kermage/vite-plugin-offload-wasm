import type { Plugin } from 'vite';

export default function offloadWasm(): Plugin {
	return {
		name: 'vite-plugin-offload-wasm',
	};
}
