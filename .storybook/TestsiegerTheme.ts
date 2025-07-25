import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  
  // Brand
  brandTitle: 'Testsieger UI',
  brandUrl: 'https://testsieger.de',
  brandImage: 'https://testsieger.de/favicon.ico',
  brandTarget: '_self',
  
  // Colors
  colorPrimary: '#FF6B35',
  colorSecondary: '#585C6D',
  
  // UI
  appBg: '#F6F9FC',
  appContentBg: '#FFFFFF',
  appBorderColor: '#585C6D',
  appBorderRadius: 4,
  
  // Typography
  fontBase: '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  
  // Text colors
  textColor: '#10162F',
  textInverseColor: '#FFFFFF',
  
  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barBg: '#FFFFFF',
  
  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
  inputBorderRadius: 2,
});