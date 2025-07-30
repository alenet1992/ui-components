<template>
  <form>
    <slot v-bind="slotProps"></slot>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, provide } from 'vue';
import type { IFormField } from './types/IFormField';
import type { IValidationFlags } from './types/IValidationFlags';

// Local "Store" with the information from each field
const fields = reactive<Record<string, IFormField>>({});
const fieldTouchedStates = reactive<Record<string, boolean>>({});
const fieldDirtyStates = reactive<Record<string, boolean>>({});
const pendingValidations = ref<Set<string>>(new Set());

// Form element validation flags
const flags = computed<IValidationFlags>(() => {
  const fieldValues = Object.values(fields);
  const touchedValues = Object.values(fieldTouchedStates);
  const dirtyValues = Object.values(fieldDirtyStates);
  
  return {
    dirty: dirtyValues.some(dirty => dirty),
    pristine: dirtyValues.every(dirty => !dirty),
    valid: fieldValues.every(field => field.isValid),
    invalid: fieldValues.some(field => !field.isValid),
    pending: pendingValidations.value.size > 0,
    touched: touchedValues.some(touched => touched),
    untouched: touchedValues.every(touched => !touched)
  };
});

// Computed errors object
const errors = computed(() => {
  const errorObj: Record<string, string[]> = {};
  Object.entries(fields).forEach(([id, field]) => {
    if (field.error) {
      errorObj[id] = [field.error];
    } else {
      errorObj[id] = [];
    }
  });
  return errorObj;
});

// Register a field with the form validator
const registerField = (id: string, validateFn: () => boolean) => {
  fields[id] = {
    id,
    isValid: true,
    error: null,
    validate: validateFn
  };
  fieldTouchedStates[id] = false;
  fieldDirtyStates[id] = false;
};

// Update field validation state
const updateFieldValidation = (id: string, isValid: boolean, error: string | null) => {
  if (fields[id]) {
    fields[id].isValid = isValid;
    fields[id].error = error;
  }
};

// Update field touched state
const updateFieldTouched = (id: string, touched: boolean) => {
  fieldTouchedStates[id] = touched;
};

// Update field dirty state
const updateFieldDirty = (id: string, dirty: boolean) => {
  fieldDirtyStates[id] = dirty;
};

// Set field as pending validation
const setFieldPending = (id: string, pending: boolean) => {
  if (pending) {
    pendingValidations.value.add(id);
  } else {
    pendingValidations.value.delete(id);
  }
};

// Validate all fields from the form
const validate = (options: { silent?: boolean } = {}) => {
  const { silent = false } = options;
  
  const validationResults = Object.values(fields).map(field => {
    if (!silent) {
      updateFieldTouched(field.id, true);
      updateFieldDirty(field.id, true);
    }
    return field.validate();
  });
  
  const isFormValid = validationResults.every(result => result);
  
  return {
    then: (callback: () => void) => {
      if (isFormValid) {
        callback();
      }
    }
  };
};

const isValid = computed(() => {
  return flags.value.valid ?? false;
});

// Reset all fields
const reset = () => {
  Object.keys(fields).forEach(id => {
    updateFieldValidation(id, true, null);
    updateFieldTouched(id, false);
    updateFieldDirty(id, false);
    setFieldPending(id, false);
  });
};

// Provide context to child components (inject this in chield field)
provide('formValidator', {
  registerField,
  updateFieldValidation,
  updateFieldTouched,
  updateFieldDirty,
  setFieldPending
});

defineExpose({
  validate,
  reset,
  flags, 
  isValid
});

// Slot props for scoped slot (used to call functions inside of the form)
const slotProps = computed<{
  flags: IValidationFlags
  errors: Record<string, string[]>
  validate: (options?: { silent?: boolean }) => { then: (callback: () => void) => void }
  reset: () => void
}>(() => ({
  flags: flags.value,
  errors: errors.value,
  validate,
  reset
}));
</script>