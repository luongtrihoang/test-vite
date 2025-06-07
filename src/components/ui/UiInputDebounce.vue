<template>
  <div class="relative">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <!-- Icon (left) -->
      <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <component :is="icon" class="w-5 h-5 text-gray-400" />
      </div>

      <!-- Input -->
      <input
        :id="id"
        ref="inputRef"
        v-model="internalValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        v-bind="$attrs"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.escape="handleEscape"
        @keydown.enter="handleEnter"
      />

      <!-- Loading spinner -->
      <div v-if="loading" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      </div>

      <!-- Clear button -->
      <button
        v-else-if="clearable && internalValue && !disabled && !readonly"
        @click="handleClear"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-600 transition-colors"
      >
        <XMarkIcon class="w-4 h-4 text-gray-400" />
      </button>

      <!-- Right icon -->
      <div v-else-if="rightIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <component :is="rightIcon" class="w-5 h-5 text-gray-400" />
      </div>
    </div>

    <!-- Error/Hint messages -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    
    <!-- Character count -->
    <p v-if="maxLength" class="mt-1 text-xs text-gray-500 text-right">
      {{ internalValue?.length || 0 }}/{{ maxLength }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel'
  id?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  loading?: boolean
  clearable?: boolean
  error?: string
  hint?: string
  icon?: any // Component
  rightIcon?: any // Component
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'error' | 'success'
  debounceMs?: number
  maxLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  id: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  disabled: false,
  readonly: false,
  required: false,
  loading: false,
  clearable: false,
  size: 'md',
  variant: 'default',
  debounceMs: 300
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
  enter: [event: KeyboardEvent]
  escape: [event: KeyboardEvent]
}>()

// Exclude class from inherited attributes
defineOptions({
  inheritAttrs: false
})

// Refs
const inputRef = ref<HTMLInputElement>()
const internalValue = ref(String(props.modelValue || ''))
const debounceTimer = ref<number>()

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (String(newValue) !== internalValue.value) {
    internalValue.value = String(newValue || '')
  }
})

// Watch internal value and debounce
watch(internalValue, (newValue) => {
  // Clear existing timer
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }

  // Set new timer
  debounceTimer.value = setTimeout(() => {
    emit('update:modelValue', newValue)
    emit('input', newValue)
  }, props.debounceMs)
}, { immediate: false })

// Computed classes
const inputClasses = computed(() => {
  const base = 'w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 transition appearance-none search-cancel-hidden'
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }

  const variants = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
  }

  const state = props.disabled 
    ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
    : props.readonly
    ? 'bg-gray-50'
    : 'bg-white'

  // Padding adjustments for icons
  const leftPadding = props.icon ? 'pl-10' : ''
  const rightPadding = (props.loading || props.clearable || props.rightIcon) ? 'pr-10' : ''

  return [
    base,
    sizes[props.size],
    variants[props.variant],
    state,
    leftPadding,
    rightPadding
  ].filter(Boolean).join(' ')
})

// Event handlers
const handleFocus = (event: FocusEvent): void => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent): void => {
  // Emit immediate change on blur
  emit('change', internalValue.value)
  emit('blur', event)
}

const handleClear = (): void => {
  internalValue.value = ''
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const handleEnter = (event: KeyboardEvent): void => {
  emit('enter', event)
}

const handleEscape = (event: KeyboardEvent): void => {
  inputRef.value?.blur()
  emit('escape', event)
}

// Expose methods
const focus = (): void => {
  inputRef.value?.focus()
}

const blur = (): void => {
  inputRef.value?.blur()
}

const select = (): void => {
  inputRef.value?.select()
}

defineExpose({
  focus,
  blur,
  select,
  inputRef
})
</script>

<style scoped>
/* Hide the default browser search cancel button */
.search-cancel-hidden::-webkit-search-cancel-button {
  display: none;
}
</style> 