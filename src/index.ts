import { extname, sep } from 'path';
import type { Plugin } from 'vite';

export default function offloadWasm(list: Record<string, string>): Plugin {
	const storage: string[] = [];

	function definedReplacement(id: string) {
		const pathParts = id.split(sep);

		for (let i = 1; i <= pathParts.length; i++) {
			const partialPath = pathParts.slice(-i).join(sep);

			if (list.hasOwnProperty(partialPath)) {
				return list[partialPath];
			}
		}

		return '';
	}

	function replacerData(moduleCode: string, replacement: string) {
		const ASSET_PATTERN = /__VITE_ASSET__.*__/;

		return {
			pattern: new RegExp(moduleCode.replace('$', `\\$`).replace(ASSET_PATTERN, '(?<localpath>[^\\;]+)')),
			replacement: moduleCode?.replace(ASSET_PATTERN, replacement),
		};
	}

	function handleReplacements(code: string, data: ReturnType<typeof replacerData>) {
		return code.replace(data.pattern, data.replacement);
	}

	return {
		name: 'vite-plugin-offload-wasm',
		enforce: 'post',
		apply: 'build',

		renderChunk(code, chunk) {
			if ('object' !== typeof list || 0 === Object.values(list).length) {
				return code;
			}

			Object.keys(chunk.modules).forEach((id) => {
				if ('.wasm?url' !== extname(id)) {
					return;
				}

				const moduleCode = chunk.modules[id].code;

				if (!moduleCode) {
					return;
				}

				const replacement = definedReplacement(id.replace('?url', ''));

				if (!replacement) {
					return;
				}

				const data = replacerData(moduleCode, replacement);

				storage.push(code.match(data.pattern)?.groups?.localpath!);

				code = handleReplacements(code, data);
			});

			return code;
		},

		generateBundle(_, bundle) {
			storage.forEach((path) => {
				delete bundle[path.replace('/', '')];
			});
		},
	};
}
