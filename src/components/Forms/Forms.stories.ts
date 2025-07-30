import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import TsInput from './elements/TsInput.vue';
import TsCheckbox from './elements/TsCheckbox.vue';
import TsDropdown from './elements/TsDropdown.vue';
import TsFormValidator from './TsFormValidator.vue';

const meta: Meta<typeof TsInput> = {
  title: 'Components/Forms',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// TsInput Stories
export const InputDefault: Story = {
  render: () => ({
    components: { TsInput },
    setup() {
      const inputValue = ref('');
      return { inputValue };
    },
    template: `
      <div style="width: 300px;">
        <TsInput 
          v-model="inputValue" 
          placeholder="Enter text here"
          label="Default Input"
        />
        <p style="margin-top: 12px; font-size: 14px; color: #666;">Value: {{ inputValue }}</p>
      </div>
    `,
  }),
};

export const InputWithIcon: Story = {
  render: () => ({
    components: { TsInput },
    setup() {
      const inputValue = ref('');
      return { inputValue };
    },
    template: `
      <div style="width: 300px;">
        <TsInput 
          v-model="inputValue" 
          placeholder="Search..."
          label="Input with Icon"
          left-icon="search"
        />
        <p style="margin-top: 12px; font-size: 14px; color: #666;">Value: {{ inputValue }}</p>
      </div>
    `,
  }),
};

export const InputWithValidation: Story = {
  render: () => ({
    components: { TsInput },
    setup() {
      const emailValue = ref('');
      return { emailValue };
    },
    template: `
      <div style="width: 300px;">
        <TsInput 
          v-model="emailValue" 
          type="email"
          placeholder="Enter your email"
          label="Email Input"
          validation-type="email"
        />
        <p style="margin-top: 12px; font-size: 14px; color: #666;">Value: {{ emailValue }}</p>
      </div>
    `,
  }),
};

export const InputDisabled: Story = {
  render: () => ({
    components: { TsInput },
    setup() {
      const inputValue = ref('Disabled input value');
      return { inputValue };
    },
    template: `
      <div style="width: 300px;">
        <TsInput 
          v-model="inputValue" 
          placeholder="This is disabled"
          label="Disabled Input"
          :disabled="true"
        />
      </div>
    `,
  }),
};

// TsCheckbox Stories
export const CheckboxDefault: Story = {
  render: () => ({
    components: { TsCheckbox },
    setup() {
      const checkboxValue = ref(false);
      return { checkboxValue };
    },
    template: `
      <div style="width: 300px;">
        <TsCheckbox 
          v-model="checkboxValue" 
          checkbox-label="I agree to the terms and conditions"
          label="Agreement"
        />
        <p style="margin-top: 12px; font-size: 14px; color: #666;">Checked: {{ checkboxValue }}</p>
      </div>
    `,
  }),
};

export const CheckboxDisabled: Story = {
  render: () => ({
    components: { TsCheckbox },
    setup() {
      const checkboxValue = ref(true);
      return { checkboxValue };
    },
    template: `
      <div style="width: 300px;">
        <TsCheckbox 
          v-model="checkboxValue" 
          checkbox-label="This checkbox is disabled"
          label="Disabled Checkbox"
          :disabled="true"
        />
      </div>
    `,
  }),
};

// TsDropdown Stories
export const DropdownDefault: Story = {
  render: () => ({
    components: { TsDropdown },
    setup() {
      const dropdownValue = ref('');
      return { dropdownValue };
    },
    template: `
      <div style="width: 300px;">
        <TsDropdown 
          v-model="dropdownValue" 
          placeholder="Select a number"
          :min-number="1"
          :max-number="10"
        />
        <p style="margin-top: 12px; font-size: 14px; color: #666;">Selected: {{ dropdownValue }}</p>
      </div>
    `,
  }),
};

export const DropdownWithOptions: Story = {
  render: () => ({
    components: { TsDropdown },
    setup() {
      const dropdownValue = ref('');
      const customOptions = [
        { value: 'small', label: 'Small (S)' },
        { value: 'medium', label: 'Medium (M)' },
        { value: 'large', label: 'Large (L)' },
        { value: 'xlarge', label: 'Extra Large (XL)' },
      ];
      return { dropdownValue, customOptions };
    },
    template: `
      <div style="width: 300px;">
        <TsDropdown 
          v-model="dropdownValue" 
          placeholder="Select size"
          :options="customOptions"
        />
        <p style="margin-top: 12px; font-size: 14px; color: #666;">Selected: {{ dropdownValue }}</p>
      </div>
    `,
  }),
};

export const DropdownWithIcon: Story = {
  render: () => ({
    components: { TsDropdown },
    setup() {
      const dropdownValue = ref('');
      return { dropdownValue };
    },
    template: `
      <div style="width: 300px;">
        <TsDropdown 
          v-model="dropdownValue" 
          placeholder="Select priority"
          left-icon="flag"
          :min-number="1"
          :max-number="5"
        />
        <p style="margin-top: 12px; font-size: 14px; color: #666;">Selected: {{ dropdownValue }}</p>
      </div>
    `,
  }),
};

// Complete Form Example
export const CompleteForm: Story = {
  render: () => ({
    components: { TsFormValidator, TsInput, TsCheckbox, TsDropdown },
    setup() {
      const formData = ref({
        name: '',
        email: '',
        age: '',
        newsletter: false,
      });
      
      const handleSubmit = () => {
        console.log('Form submitted:', formData.value);
      };
      
      return { formData, handleSubmit };
    },
    template: `
      <div style="width: 400px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h3 style="margin: 0 0 20px 0;">Registration Form</h3>
        <TsFormValidator>
          <div style="margin-bottom: 16px;">
            <TsInput 
              v-model="formData.name" 
              placeholder="Enter your full name"
              label="Full Name"
              validation-type="text"
            />
          </div>
          
          <div style="margin-bottom: 16px;">
            <TsInput 
              v-model="formData.email" 
              type="email"
              placeholder="Enter your email"
              label="Email Address"
              validation-type="email"
            />
          </div>
          
          <div style="margin-bottom: 16px;">
            <TsDropdown 
              v-model="formData.age" 
              placeholder="Select your age range"
              :options="[
                { value: '18-25', label: '18-25 years' },
                { value: '26-35', label: '26-35 years' },
                { value: '36-45', label: '36-45 years' },
                { value: '46+', label: '46+ years' }
              ]"
            />
          </div>
          
          <div style="margin-bottom: 20px;">
            <TsCheckbox 
              v-model="formData.newsletter" 
              checkbox-label="Subscribe to our newsletter"
              label="Newsletter"
            />
          </div>
          
          <button 
            @click="handleSubmit"
            style="
              background: #007bff; 
              color: white; 
              border: none; 
              padding: 12px 24px; 
              border-radius: 6px; 
              cursor: pointer;
              width: 100%;
              font-size: 16px;
            "
          >
            Submit Form
          </button>
        </TsFormValidator>
        
        <div style="margin-top: 20px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px;">Form Data:</h4>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
};

// Form Validation Example
export const FormValidationExample: Story = {
  render: () => ({
    components: { TsFormValidator, TsInput, TsCheckbox },
    setup() {
      const formData = ref({
        postalCode: '',
        city: '',
        terms: false,
      });
      
      return { formData };
    },
    template: `
      <div style="width: 400px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h3 style="margin: 0 0 20px 0;">Address Form (German Validation)</h3>
        <TsFormValidator>
          <div style="margin-bottom: 16px;">
            <TsInput 
              v-model="formData.postalCode" 
              placeholder="12345"
              label="Postal Code"
              validation-type="postalCode"
              :max-length="5"
            />
          </div>
          
          <div style="margin-bottom: 16px;">
            <TsInput 
              v-model="formData.city" 
              placeholder="Enter city name"
              label="City"
              validation-type="stadt"
            />
          </div>
          
          <div style="margin-bottom: 20px;">
            <TsCheckbox 
              v-model="formData.terms" 
              checkbox-label="I accept the terms and conditions"
              label="Terms"
            />
          </div>
        </TsFormValidator>
        
        <div style="margin-top: 20px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px;">Form Data:</h4>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
};