<template>
  <div class="w-100">
    <div 
      :class="[
        'ts-dropdown',
        { 'ts-dropdown--error': hasError },
        { 'ts-dropdown--focused': isFocused },
        { 'ts-dropdown--open': isOpen }
      ]"
    >
      <span v-if="leftIcon" class="ts-dropdown__icon ts-dropdown__icon--left">
        <TsIcons :icon="leftIcon" />
      </span>
      <select
        ref="selectRef"
        v-model="selectedValue"
        :disabled="disabled"
        class="ts-dropdown__field"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @mousedown="handleMouseDown"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option 
          v-for="option in numberOptions" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="ts-dropdown__icon ts-dropdown__icon--right">
        <svg class="ts-dropdown__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </span>
    </div>
    <div v-if="hasError && errorMessage" class="ts-dropdown__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject, onMounted } from 'vue';
import { nanoid } from 'nanoid';
import { validateByType, type GermanValidationType } from '../validations/germanValidations';
import TsIcons from '@/components/TsIcons.vue';

interface NumberOption {
  value: string
  label: string
}

interface IEmits {
  'update:modelValue': [value: string]
  'validation-change': [isValid: boolean, error: string | null]
}

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  disabled?: boolean
  leftIcon?: string
  validationType?: GermanValidationType
  customValidation?: (value: string) => string | null
  vid?: string
  minNumber?: number
  maxNumber?: number
  step?: number
  options?: NumberOption[]
}>(), {
  placeholder: 'Wählen Sie eine Nummer',
  disabled: false,
  leftIcon: '',
  validationType: 'none',
  customValidation: () => null,
  vid: () => nanoid(8),
  minNumber: 1,
  maxNumber: 100,
  step: 1,
  options: undefined
});

const emit = defineEmits<IEmits>();

const selectRef = ref<HTMLSelectElement>();
const isFocused = ref(false);
const isTouched = ref(false);
const hasSelected = ref(false);
const isOpen = ref(false);
const errorMessage = ref<string | null>(null);
const fieldId = ref(props.vid);
const hasBeenTouched = ref(false);
const hasBeenDirty = ref(false);
const hasError = computed(() => !!errorMessage.value && isTouched.value && hasSelected.value);
const selectedValue = ref('');

// Generate number options if not provided
const numberOptions = computed<NumberOption[]>(() => {
  if (props.options) {
    return props.options;
  }
  
  const options: NumberOption[] = [];
  for (let i = props.minNumber; i <= props.maxNumber; i += props.step) {
    options.push({
      value: i.toString(),
      label: i.toString()
    });
  }
  return options;
});

const formValidator = inject<{
  registerField: (id: string, validateFn: () => boolean) => void
  updateFieldValidation: (id: string, isValid: boolean, error: string | null) => void
  updateFieldTouched: (id: string, touched: boolean) => void
  updateFieldDirty: (id: string, dirty: boolean) => void
  setFieldPending: (id: string, pending: boolean) => void
  //@ts-expect-error necessary
}>('formValidator', {});

const validate = (): boolean => {
  const currentValue = props.modelValue || selectedValue.value;
  validateInput(currentValue);
  isTouched.value = true;
  hasSelected.value = true;
  return !errorMessage.value;
};

const validateField = (): boolean => {
  return validate();
};

defineExpose({
  validate,
  focus: () => selectRef.value?.focus(),
  blur: () => selectRef.value?.blur(),
  fieldId: fieldId.value
});

const validateInput = (value: string): void => {
  let error: string | null = null;
  
  if (props.validationType === 'none') {
    error = props.customValidation(value);
  } else {
    error = validateByType(value, props.validationType);
  }
  
  errorMessage.value = error;

  if (formValidator) {
    formValidator.updateFieldValidation(fieldId.value, !error, error);
  }

  emit('validation-change', !error, error);
};

const handleChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  
  if (value) {
    hasSelected.value = true;
  }
  
  if (!hasBeenDirty.value) {
    hasBeenDirty.value = true;
    if (formValidator) {
      formValidator.updateFieldDirty(fieldId.value, true);
    }
  }
  
  selectedValue.value = value;
  emit('update:modelValue', value);
  validateInput(value);
};

const handleFocus = (): void => {
  isFocused.value = true;
};

const handleBlur = (): void => {
  isFocused.value = false;
  isOpen.value = false;
  isTouched.value = true;
  
  if (!hasBeenTouched.value) {
    hasBeenTouched.value = true;
    if (formValidator) {
      formValidator.updateFieldTouched(fieldId.value, true);
    }
  }
};

const handleMouseDown = (): void => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  if (formValidator) {
    formValidator.registerField(fieldId.value, validateField);
  }
});

watch(() => props.modelValue, (newValue, oldValue) => {
  selectedValue.value = newValue;
  validateInput(newValue);
  
  if (newValue !== oldValue && !hasBeenDirty.value) {
    hasBeenDirty.value = true;
    if (formValidator) {
      formValidator.updateFieldDirty(fieldId.value, true);
    }
  }
}, { immediate: true });
</script>

<style lang="scss" scoped>
.ts-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background-color: var(--white);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    border-color: var(--primary);
  }
  
  &--focused {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 67, 122, 0.1);
  }
  
  &--error {
    border-color: #dc3545;
    
    &:hover,
    &.ts-dropdown--focused {
      border-color: #dc3545;
      box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
    }
  }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    
    &--left {
      padding-left: 0.75rem;
      padding-right: 0.5rem;
    }
    
    &--right {
      padding-left: 0.5rem;
      padding-right: 0.75rem;
      transition: transform 0.2s ease-in-out;
    }
  }
  
  &--open &__icon--right {
    transform: rotate(180deg);
  }
  
  &__chevron {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease-in-out;
  }
  
  &__field {
    flex: 1;
    padding: 0.75rem;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    color: var(--text-color);
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    option {
      padding: 0.5rem;
      background-color: var(--white);
      color: var(--text-color);
      
      &:disabled {
        color: #9ca3af;
        font-style: italic;
      }
    }
  }
}

.ts-dropdown__error {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
}
</style>