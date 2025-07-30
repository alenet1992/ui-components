import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import TestsiegerTheme from './TestsiegerTheme';
import '../src/styles/variables.css';

// Setup Pinia for Storybook
setup((app) => {
  app.use(createPinia());
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Components', 'Examples'],
      },
    },
    docs: {
      title: 'Testsieger UI',
      theme: TestsiegerTheme,
    },
  },
};

export default preview;