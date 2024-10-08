import React from 'react'
import { Preview } from '@storybook/react'

import { ReactQueryProvider } from '../src/lib/providers/react-query-provider'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <ReactQueryProvider>
        <Story />
      </ReactQueryProvider>
    ),
  ],
}

export default preview
