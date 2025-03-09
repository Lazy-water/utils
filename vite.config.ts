import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, './lib/index.ts'),
			name: 'ltUtils',
			fileName: (format) => `index.${format}.js`
		}
	}
})
