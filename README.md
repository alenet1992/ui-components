# Testsieger UI Components

![Testsieger Logo](https://testsieger.de/favicon.ico)

A modern UI components library built with Vue 3, TypeScript, and Storybook by Testsieger.

## Features

- 🚀 **Vue 3** with Composition API
- 📘 **TypeScript** for type safety
- 📚 **Storybook** for component documentation and development
- 🎨 **Modern CSS** with scoped styles
- 🧪 **Vitest** for testing
- 📦 **Pinia** for state management
- ⚡ **Vite** for fast development and building

## Components

### BaseCard
A flexible and customizable card component for displaying content with optional styling.

**Props:**
- `extraStyles`: object | string (optional) - Additional CSS styles to apply to the card

**Slots:**
- `default` - Main content area of the card

**Features:**
- Responsive design
- Customizable styling through props
- Clean, modern appearance
- TypeScript support
- Scoped CSS with CSS variables

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ts-ui-components
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

#### Start Storybook
```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
```

This will start Storybook on `http://localhost:6006` where you can view and interact with all components.

#### Start Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

#### Build for Production
```bash
npm run build
# or
yarn build
# or
pnpm build
```

#### Build Storybook
```bash
npm run build-storybook
# or
yarn build-storybook
# or
pnpm build-storybook
```

### Testing

```bash
npm run test
# or
yarn test
# or
pnpm test
```

For UI testing:
```bash
npm run test:ui
# or
yarn test:ui
# or
pnpm test:ui
```

### Linting

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## Usage

### As a Library

```typescript
import { BaseCard } from 'alexandrepereira-ts-ui-components';
import type { BaseCardProps } from 'alexandrepereira-ts-ui-components';
```

### Example Usage

```vue
<template>
  <div>
    <!-- Basic usage -->
    <BaseCard>
      <h3>Welcome to Testsieger UI</h3>
      <p>This is a basic card with default styling.</p>
    </BaseCard>

    <!-- Card with custom styles -->
    <BaseCard :extraStyles="{ backgroundColor: '#f0f8ff', padding: '2rem' }">
      <h3>Custom Styled Card</h3>
      <p>This card has custom background and padding.</p>
    </BaseCard>

    <!-- Card with string-based styles -->
    <BaseCard extraStyles="border: 2px solid #007bff; border-radius: 12px;">
      <h3>Product Card</h3>
      <p>Perfect for showcasing products or services.</p>
      <button>Learn More</button>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { BaseCard } from 'alexandrepereira-ts-ui-components';
import type { BaseCardProps } from 'alexandrepereira-ts-ui-components';
</script>
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Make your changes
4. Add tests and stories for new components
5. Run linting and tests: `npm run lint && npm run test`
6. Commit your changes: `git commit -am 'Add new component'`
7. Push to the branch: `git push origin feature/new-component`
8. Submit a pull request

## License

MIT License - see LICENSE file for details.