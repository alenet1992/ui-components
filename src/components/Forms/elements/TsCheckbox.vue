<template>
  <label v-if="label" class="field-label">{{ label }}</label>
  <div class="w-100">
    <div class="checkbox-field">
      <input 
        :id="checkboxId" 
        v-model="internalValue" 
        type="checkbox" 
        class="checkbox-input"
        :disabled="disabled"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <label :for="checkboxId" class="checkbox-label">
        <div class="checkbox-icon">
          <span class="checkmark" v-if="internalValue">✓</span>
        </div>
        <span class="checkbox-text">{{ checkboxLabel }}</span>
      </label>
    </div>
    <div v-if="hasError && errorMessage" class="ts-checkbox__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject, onMounted } from 'vue';
import { nanoid } from 'nanoid';
import { validateByType, type GermanValidationType } from '../validations/germanValidations';

interface IEmits {
  'update:modelValue': [value: boolean]
  'validation-change': [isValid: boolean, error: string | null]
}

const props = withDefaults(defineProps<{
  modelValue: boolean
  checkboxLabel?: string
  disabled?: boolean
  validationType?: GermanValidationType
  customValidation?: (value: boolean) => string | null
  vid?: string
  label?: string
  id?: string
}>(), {
  checkboxLabel: '',
  disabled: false,
  validationType: 'none',
  customValidation: () => null,
  vid: () => nanoid(8),
  label: '',
  id: () => nanoid(8)
});

const emit = defineEmits<IEmits>();

const isFocused = ref(false);
const isTouched = ref(false);
const hasTyped = ref(false);
const errorMessage = ref<string | null>(null);
const fieldId = ref(props.vid);
const hasBeenTouched = ref(false);
const hasBeenDirty = ref(false);
const hasError = computed(() => !!errorMessage.value && isTouched.value && hasTyped.value);

const formValidator = inject<{
  registerField: (id: string, validateFn: () => boolean) => void
  updateFieldValidation: (id: string, isValid: boolean, error: string | null) => void
  updateFieldTouched: (id: string, touched: boolean) => void
  updateFieldDirty: (id: string, dirty: boolean) => void
  setFieldPending: (id: string, pending: boolean) => void
  //@ts-expect-error necessary
}>('formValidator', {});

const checkboxId = computed(() => props.id);

const internalValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value);
    validateInput(value);
  }
});

const validate = (): boolean => {
  validateInput(props.modelValue);
  isTouched.value = true;
  hasTyped.value = true;
  return !errorMessage.value;
};

const validateField = (): boolean => {
  return validate();
};

defineExpose({
  validate,
  fieldId: fieldId.value
});

const validateInput = (value: boolean): void => {
  let error: string | null = null;
  
  if (props.validationType === 'none') {
    error = props.customValidation(value);
  } else {
    error = validateByType(value.toString(), props.validationType);
  }
  
  errorMessage.value = error;

  if (formValidator) {
    formValidator.updateFieldValidation(fieldId.value, !error, error);
  }

  emit('validation-change', !error, error);
};

const handleChange = (): void => {
  if (!hasTyped.value) {
    hasTyped.value = true;
  }
  
  if (!hasBeenDirty.value) {
    hasBeenDirty.value = true;
    if (formValidator) {
      formValidator.updateFieldDirty(fieldId.value, true);
    }
  }
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

onMounted(() => {
  if (formValidator) {
    formValidator.registerField(fieldId.value, validateField);
  }
});

watch(() => props.modelValue, (newValue, oldValue) => {
  validateInput(newValue);
  
  if (newValue !== oldValue && !hasBeenDirty.value) {
    hasBeenDirty.value = true;
    if (formValidator) {
      formValidator.updateFieldDirty(fieldId.value, true);
    }
  }
}, { immediate: true });
</script>

<style scoped lang="scss">
.field-label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.checkbox {
  &-text {
    font-size: 14px;
    color: #374151;
    font-weight: 500;
  }
  
  &-input {
    display: none;
    
    &:checked + .checkbox-label .checkbox-icon {
      background: var(--color-blue-600);
      border-color: var(--color-blue-600);
      color: var(--white);

      svg {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    &:disabled + .checkbox-label {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    
    &:hover .checkbox-icon {
      border-color: #9ca3af;
    }
  }

  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    background: white;
    transition: all 0.2s ease;

    svg {
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.2s ease;
      color: white;
    }
  }
}

.ts-checkbox__error {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
}
</style>