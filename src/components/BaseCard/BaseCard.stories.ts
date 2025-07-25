import type { Meta, StoryObj } from '@storybook/vue3';
import BaseCard from './BaseCard.vue';

const meta: Meta<typeof BaseCard> = {
  title: 'Components/BaseCard',
  component: BaseCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    extraStyles: {
      control: { type: 'object' },
      description: 'Custom styles as object or string',
    },
    default: {
      control: { type: 'text' },
      description: 'Card content (slot)',
    },
  },
  args: {
    extraStyles: {},
    default: 'Card content goes here',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    extraStyles: {},
  },
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args };
    },
    template: `
      <BaseCard v-bind="args">
        <h3>Default Card</h3>
        <p>This is a basic card with default styling.</p>
      </BaseCard>
    `,
  }),
};

export const WithBorder: Story = {
  args: {
    extraStyles: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
    },
  },
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args };
    },
    template: `
      <BaseCard v-bind="args">
        <h3>Card with Border</h3>
        <p>This card has a border and rounded corners.</p>
      </BaseCard>
    `,
  }),
};

export const WithShadow: Story = {
  args: {
    extraStyles: {
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
    },
  },
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args };
    },
    template: `
      <BaseCard v-bind="args">
        <h3>Card with Shadow</h3>
        <p>This card has a subtle shadow effect.</p>
        <button style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Action</button>
      </BaseCard>
    `,
  }),
};

export const WithBackground: Story = {
  args: {
    extraStyles: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
    },
  },
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args };
    },
    template: `
      <BaseCard v-bind="args">
        <h3>Card with Background</h3>
        <p>This card has a custom background color.</p>
        <div style="display: flex; gap: 12px; margin-top: 12px;">
          <span style="font-size: 14px;">📊 100 views</span>
          <span style="font-size: 14px;">❤️ 25 likes</span>
        </div>
      </BaseCard>
    `,
  }),
};

export const WithGradient: Story = {
  args: {
    extraStyles: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; color: white; padding: 24px;',
  },
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args };
    },
    template: `
      <BaseCard v-bind="args">
        <h3 style="color: white; margin: 0 0 12px 0;">Gradient Card</h3>
        <p style="color: white; opacity: 0.9; margin: 0 0 16px 0;">This card uses a gradient background.</p>
        <button style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 8px 16px; border-radius: 6px; cursor: pointer;">Explore</button>
      </BaseCard>
    `,
  }),
};

export const InteractiveCard: Story = {
  args: {
    extraStyles: {
      border: '1px solid #007bff',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: '20px',
    },
  },
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args };
    },
    template: `
      <BaseCard 
        v-bind="args" 
        @mouseenter="$event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 6px 12px rgba(0, 123, 255, 0.15)';"
        @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';"
      >
        <h3>Interactive Card</h3>
        <p>Hover over this card to see the effect!</p>
        <div style="background: #f8f9fa; padding: 8px 12px; border-radius: 6px; font-size: 14px; text-align: center; margin-top: 12px;">
          👆 Hover me!
        </div>
      </BaseCard>
    `,
  }),
};

export const CustomContent: Story = {
  args: {
    extraStyles: {
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
    },
  },
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args };
    },
    template: `
      <BaseCard v-bind="args">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px;">Project Alpha</h3>
          <span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; background: #f8d7da; color: #721c24;">URGENT</span>
        </div>
        <p style="margin: 0 0 12px 0;">Development of new system functionality.</p>
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #f0f0f0;">
          <span style="color: #666; font-size: 12px;">Jan 15, 2024</span>
          <button style="background: #6c757d; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">View</button>
        </div>
      </BaseCard>
    `,
  }),
};