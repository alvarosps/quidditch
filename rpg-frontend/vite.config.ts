import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@mocks': path.resolve(__dirname, 'src/mocks'),
            '@models': path.resolve(__dirname, 'src/models'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@_types': path.resolve(__dirname, 'src/types'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@providers': path.resolve(__dirname, 'src/providers'),
            '@engine': path.resolve(__dirname, 'src/engine'),
            '@constants': path.resolve(__dirname, 'src/constants'),
        },
    },
});
