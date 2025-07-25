# Exemplo de Uso

## Instalação

```bash
npm install @alexandrepereira/ts-ui-components
```

## Uso Básico

### Em um projeto Vue 3

```vue
<template>
  <div>
    <!-- Botão -->
    <UiButton 
      variant="primary" 
      size="medium" 
      @click="handleClick"
    >
      Clique aqui
    </UiButton>

    <!-- Card -->
    <UiCard 
      title="Título do Card" 
      subtitle="Subtítulo do card"
      shadow="medium"
      hoverable
    >
      <p>Conteúdo do card aqui...</p>
      
      <template #footer>
        <UiButton variant="outline" size="small">
          Ação
        </UiButton>
      </template>
    </UiCard>

    <!-- Input -->
    <UiInput
      v-model="inputValue"
      label="Nome"
      placeholder="Digite seu nome"
      required
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiButton, UiCard, UiInput } from '@alexandrepereira/ts-ui-components';
import '@alexandrepereira/ts-ui-components/dist/style.css';

const inputValue = ref('');

const handleClick = () => {
  console.log('Botão clicado!');
};
</script>
```

### Importação Individual

```typescript
// Importar apenas os componentes necessários
import { UiButton } from '@alexandrepereira/ts-ui-components';
import type { ButtonProps } from '@alexandrepereira/ts-ui-components';

// Importar estilos
import '@alexandrepereira/ts-ui-components/dist/style.css';
```

### Registro Global (opcional)

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import * as UiComponents from '@alexandrepereira/ts-ui-components';
import '@alexandrepereira/ts-ui-components/dist/style.css';

const app = createApp(App);

// Registrar todos os componentes globalmente
Object.entries(UiComponents).forEach(([name, component]) => {
  if (typeof component === 'object' && component.name) {
    app.component(name, component);
  }
});

app.mount('#app');
```

## Componentes Disponíveis

### UiButton
- **Props**: variant, size, disabled, loading, type
- **Eventos**: click
- **Variantes**: primary, secondary, danger, outline
- **Tamanhos**: small, medium, large

### UiCard
- **Props**: title, subtitle, shadow, hoverable, padding
- **Slots**: default, footer
- **Sombras**: none, small, medium, large

### UiInput
- **Props**: modelValue, type, placeholder, label, disabled, readonly, required, size, error, helperText
- **Eventos**: update:modelValue
- **Tipos**: text, email, password, number
- **Tamanhos**: small, medium, large

## TypeScript

Todos os componentes incluem definições de tipos TypeScript completas:

```typescript
import type { 
  ButtonProps, 
  CardProps, 
  InputProps 
} from '@alexandrepereira/ts-ui-components';
```