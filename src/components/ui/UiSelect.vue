<template>
  <div class="relative">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <select
      :id="id"
      :value="modelValue"
      @change="handleChange"
      :disabled="disabled"
      :class="selectClasses"
      v-bind="$attrs"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="getOptionValue(option)" 
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>

    <div v-if="loading" class="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
    </div>

    <!-- Clear button -->
    <button
      v-else-if="clearable && modelValue && !disabled"
      @click="handleClear"
      type="button"
      class="absolute right-8 top-1/2 transform -translate-y-1/2 hover:text-gray-600 transition-colors"
      :class="{ 'top-1/2 mt-3': label }"
    >
      <XMarkIcon class="w-4 h-4 text-gray-400" />
    </button>

    <ChevronDownIcon 
      v-else
      class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
      :class="{ 'top-1/2 mt-3': label }"
    />

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline'

// Types
interface Option {
  value: string | number
  label: string
  disabled?: boolean
}

type OptionType = string | number | Option

interface Props {
  modelValue: string | number
  options: OptionType[]
  label?: string
  placeholder?: string
  id?: string
  disabled?: boolean
  loading?: boolean
  required?: boolean
  clearable?: boolean
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'error' | 'success'
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  id: () => `select-${Math.random().toString(36).substr(2, 9)}`,
  disabled: false,
  loading: false,
  required: false,
  clearable: false,
  size: 'md',
  variant: 'default'
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
  clear: []
}>()

// Exclude class from inherited attributes to avoid conflicts
defineOptions({
  inheritAttrs: false
})

// Computed styles
const selectClasses = computed(() => {
  const base = 'w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 transition duration-200 appearance-none'
  
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

  const disabled = props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'

  return [
    base,
    sizes[props.size],
    variants[props.variant],
    disabled,
    'pr-10' // Space for chevron icon
  ].join(' ')
})

// Helper functions
const getOptionValue = (option: OptionType): string | number => {
  return typeof option === 'object' ? option.value : option
}

const getOptionLabel = (option: OptionType): string => {
  return typeof option === 'object' ? option.label : String(option)
}

const handleChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  
  // Convert to number if the original value was a number
  const convertedValue = !isNaN(Number(value)) && props.options.some(opt => 
    typeof getOptionValue(opt) === 'number'
  ) ? Number(value) : value

  emit('update:modelValue', convertedValue)
  emit('change', convertedValue)
}

const handleClear = (): void => {
  emit('update:modelValue', '')
  emit('clear')
}
</script> 