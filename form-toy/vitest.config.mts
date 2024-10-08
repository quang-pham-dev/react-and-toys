import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    include: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    coverage: {
      include: [
        'src/app/**/*',
        'src/components/**/*',
        'src/hooks/**/*',
        'src/lib/**/*',
      ],
      exclude: [
        ...(configDefaults.coverage.exclude || []),
        '**/index.ts',
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'src/types/*',
        'src/config/*',
        'src/constants/*',
        'src/lib/providers/*',
        '**/*.stories.tsx',
      ],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    css: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude],
    globals: true,
    reporters: ['default', 'html'],
    setupFiles: ['test/setup-tests.ts'],
  },
})
