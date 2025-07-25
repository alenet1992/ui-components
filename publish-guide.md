# Guia de Publicação

## Preparação para Publicação

### 1. Verificar se está logado no npm
```bash
npm whoami
```

Se não estiver logado:
```bash
npm login
```

### 2. Verificar se o nome do package está disponível
```bash
npm view @alexandrepereira/ts-ui-components
```

Se retornar erro 404, o nome está disponível.

### 3. Testar o build
```bash
npm run build
```

### 4. Executar testes (quando implementados)
```bash
npm test
```

### 5. Verificar o que será publicado
```bash
npm pack --dry-run
```

## Publicação

### Primeira publicação
```bash
npm publish --access public
```

### Atualizações

#### Patch (1.0.0 → 1.0.1)
```bash
npm version patch
npm publish
```

#### Minor (1.0.0 → 1.1.0)
```bash
npm version minor
npm publish
```

#### Major (1.0.0 → 2.0.0)
```bash
npm version major
npm publish
```

## Teste Local

### Criar um link local
```bash
# No diretório do package
npm link

# Em um projeto de teste
npm link @alexandrepereira/ts-ui-components
```

### Testar instalação local
```bash
npm pack
# Isso criará um arquivo .tgz que pode ser instalado em outro projeto
```

## Verificação Pós-Publicação

1. Verificar no npm: https://www.npmjs.com/package/@alexandrepereira/ts-ui-components
2. Testar instalação em um projeto novo:
   ```bash
   npm install @alexandrepereira/ts-ui-components
   ```

## Scripts Úteis

```bash
# Verificar arquivos que serão incluídos no package
npm pack --dry-run

# Verificar informações do package
npm view @alexandrepereira/ts-ui-components

# Verificar versões publicadas
npm view @alexandrepereira/ts-ui-components versions --json
```

## Estrutura Final do Package

```
dist/
├── index.d.ts              # Tipos principais
├── src/
│   ├── components/         # Tipos dos componentes
│   └── index.d.ts         # Tipos do src
├── style.css              # Estilos CSS
├── ts-ui-components.es.js # Build ES modules
├── ts-ui-components.umd.js # Build UMD
└── *.map                  # Source maps
```

## Pontos de Entrada

- **Main (CommonJS)**: `dist/ts-ui-components.umd.js`
- **Module (ES)**: `dist/ts-ui-components.es.js`
- **Types**: `dist/index.d.ts`
- **Styles**: `dist/style.css`