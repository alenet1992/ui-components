<template>
  <label v-if="label" class="field-label">{{ label }} *</label>
  <div class="w-100">
    <div 
      :class="[
        'ts-input d-flex',
        { 'ts-input--error': hasError },
        { 'ts-input--focused': isFocused },
        { 'ts-input--disabled': disabled },
        { 'ts-input--validated': isTouched && hasTyped && !hasError }
      ]"
    >
      <span v-if="leftIcon" class="ts-input__icon ts-input__icon--left">
        <TsIcons :icon="leftIcon" />
      </span>
      <input
        ref="inputRef"
        v-model="displayValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        class="ts-input__field"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      <TsIcons class="mr-2 ts-input__icon-check" icon="check-icon" />
    </div>
    <div v-if="hasError && errorMessage" class="ts-input__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, inject, onMounted } from 'vue';
import { nanoid } from 'nanoid';
import { validateByType, type GermanValidationType } from '../validations/germanValidations';
import TsIcons from '@/components/TsIcons.vue';

interface IEmits {
  'update:modelValue': [value: string]
  'validation-change': [isValid: boolean, error: string | null]
}

const props = withDefaults(defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  disabled?: boolean
  leftIcon?: string
  mask?: string
  validationType?: GermanValidationType
  customValidation?: (value: string) => string | null
  maxLength?: number
  vid?: string, 
  label?: string
}>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  leftIcon: '',
  mask: '',
  validationType: 'none',
  customValidation: () => null,
  maxLength: undefined,
  vid: () => nanoid(8),
  label: ''
});

const emit = defineEmits<IEmits>();

const inputRef = ref<HTMLInputElement>();
const isFocused = ref(false);
const isTouched = ref(false);
const hasTyped = ref(false);
const errorMessage = ref<string | null>(null);
const fieldId = ref(props.vid);
const hasBeenTouched = ref(false);
const hasBeenDirty = ref(false);
const hasError = computed(() => !!errorMessage.value && isTouched.value && hasTyped.value);
const displayValue = ref('');

const formValidator = inject<{
  registerField: (id: string, validateFn: () => boolean) => void
  updateFieldValidation: (id: string, isValid: boolean, error: string | null) => void
  updateFieldTouched: (id: string, touched: boolean) => void
  updateFieldDirty: (id: string, dirty: boolean) => void
  setFieldPending: (id: string, pending: boolean) => void
  //@ts-expect-error necessary
}>('formValidator', {});

const validate = (): boolean => {
  const currentValue = props.modelValue || displayValue.value;
  validateInput(currentValue);
  isTouched.value = true;
  hasTyped.value = true;
  return !errorMessage.value;
};

const validateField = (): boolean => {
  return validate();
};

defineExpose({
  validate,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  fieldId: fieldId.value
});

const applyMask = (value: string, mask: string): string => {
  if (!mask) return value;
  
  const numbers = value.replace(/\D/g, '');
  
  let masked = '';
  let numberIndex = 0;
  
  for (let i = 0; i < mask.length && numberIndex < numbers.length; i++) {
    if (mask[i] === '9') {
      masked += numbers[numberIndex];
      numberIndex++;
    } else {
      masked += mask[i];
    }
  }
  
  return masked;
};

const removeMask = (value: string): string => {
  return value.replace(/\D/g, '');
};

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

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  let value = target.value;
  
  if (value.length > 0) {
    hasTyped.value = true;
  }
  
  if (!hasBeenDirty.value) {
    hasBeenDirty.value = true;
    if (formValidator) {
      formValidator.updateFieldDirty(fieldId.value, true);
    }
  }
  
  if (props.mask) {
    value = applyMask(value, props.mask);
    displayValue.value = value;
    
    const cleanValue = removeMask(value);
    emit('update:modelValue', cleanValue);
    validateInput(cleanValue);
  } else {
    displayValue.value = value;
    emit('update:modelValue', value);
    validateInput(value);
  }
  
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.value = displayValue.value;
    }
  });
};

const handleFocus = (): void => {
  isFocused.value = true;
};

const handleBlur = (): void => {
  isFocused.value = false;
  isTouched.value = true;
  
  if (!hasBeenTouched.value) {
    hasBeenTouched.value = true;
    if (formValidator) {
      formValidator.updateFieldTouched(fieldId.value, true);
    }
  }
};

const handleKeydown = (event: KeyboardEvent): void => {
  if (props.mask && props.mask.includes('9')) {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ];
    
    const isNumber = /^[0-9]$/.test(event.key);
    const isAllowedKey = allowedKeys.includes(event.key);
    const isCtrlA = event.ctrlKey && event.key === 'a';
    const isCtrlC = event.ctrlKey && event.key === 'c';
    const isCtrlV = event.ctrlKey && event.key === 'v';
    const isCtrlX = event.ctrlKey && event.key === 'x';
    
    if (!isNumber && !isAllowedKey && !isCtrlA && !isCtrlC && !isCtrlV && !isCtrlX) {
      event.preventDefault();
    }
  }
};

onMounted(() => {
  if (formValidator) {
    formValidator.registerField(fieldId.value, validateField);
  }
});

watch(() => props.modelValue, (newValue, oldValue) => {
  if (props.mask) {
    displayValue.value = applyMask(newValue, props.mask);
  } else {
    displayValue.value = newValue;
  }
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
.ts-input {
  position: relative;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background-color: var(--white);
  transition: all 0.2s ease-in-out;
  
  &--focused {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 67, 122, 0.1);
  }
  
  &--error {
    border-color: var(--color-red-300);
    background-color: var(--color-red-50);

    &:hover,
    &.ts-input--focused {
      border-color: var(--color-red-300);
      box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
    }
  }

  &--disabled {
    .ts-input__icon {
      opacity: 0.7;
    }
  }

  &--validated {
    border-color: var(--color-green-300);
    background-color: var(--color-green-50);

    .ts-input__icon-check {
      display: block;
    }
  }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    
    &--left {
      padding-left: 0.75rem;
    }

    &-check {
      display: none;
      stroke: var(--color-green-600);
    }
  }
  
  &__field {
    flex: 1;
    padding: 0.75rem;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    color: var(--text-color);
    width: 100%;
    
    &::placeholder {
      color: #9ca3af;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__error {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #dc3545;
  }

  &:hover:not(.ts-input--disabled) {
    border-color: var(--primary);
  }
}
</style>