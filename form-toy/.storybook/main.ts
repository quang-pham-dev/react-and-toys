import path from 'path'
import type { StorybookConfig } from '@storybook/nextjs'
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/node-logger',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: config => {
    if (config.resolve) {
      config.resolve.plugins = config.resolve.plugins || []
      config.resolve.plugins.push(
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        }),
      )
    }
    return config
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
