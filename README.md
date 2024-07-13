# Vite Plugin: Offload WASM

> Serve WASM from a CDN or any remote location, bypassing the local server entirely

## Usage

`pnpm add -D vite-plugin-wasm vite-plugin-offload-wasm`

```ts
import wasm from 'vite-plugin-wasm';
import offloadWasm from 'vite-plugin-offload-wasm';

export default defineConfig({
  plugins: [
    wasm(),
    offloadWasm({
      'path.to.wasm': 'https://example.com/with/file.wasm',
      '@another/test.wasm': 'https://unpkg.com/@another/test.wasm',
    }),
  ],
});
```
