"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="vitest" />
const vite_1 = require("vite");
const vite_tsconfig_paths_1 = require("vite-tsconfig-paths");
exports.default = (0, vite_1.defineConfig)({
    cacheDir: '../../node_modules/.vite/find-tournaments',
    plugins: [
        (0, vite_tsconfig_paths_1.default)({
            root: '../../',
        }),
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [
    //    viteTsConfigPaths({
    //      root: '../../',
    //    }),
    //  ],
    // },
    test: {
        globals: true,
        cache: {
            dir: '../../node_modules/.vitest',
        },
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
});
//# sourceMappingURL=vite.config.js.map