<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <div 
      v-if="loading" 
      class="animate-spin rounded-full border-b-2 border-current"
      :class="loadingIconSize"
    />
    
    <!-- Left icon -->
    <component 
      v-else-if="leftIcon" 
      :is="leftIcon" 
      :class="iconSize" 
    />
    
    <!-- Button text -->
    <span v-if="text">
      {{ text }}
    </span>
    <slot v-else />
    
    <!-- Right icon -->
    <component 
      v-if="rightIcon && !loading" 
      :is="rightIcon" 
      :class="iconSize" 
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  rounded?: boolean
  text?: string
  leftIcon?: any
  rightIcon?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
  rounded: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

defineOptions({
  inheritAttrs: false
})

// Computed classes
const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  // Size classes
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-base'
  }

  // Variant classes
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 disabled:bg-yellow-400',
    info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500 disabled:bg-cyan-400',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-400 disabled:hover:bg-transparent',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400'
  }

  // Border radius
  const borderRadius = props.rounded ? 'rounded-full' : 'rounded-md'

  // Block width
  const width = props.block ? 'w-full' : ''

  // Disabled/loading state
  const disabled = (props.disabled || props.loading) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'

  // Icon spacing  
  const spacing = (props.leftIcon || props.loading || props.rightIcon) && props.text ? 'gap-2' : ''

  return [
    base,
    sizes[props.size],
    variants[props.variant],
    borderRadius,
    width,
    disabled,
    spacing
  ].filter(Boolean).join(' ')
})

// Icon sizes based on button size
const iconSize = computed(() => {
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-5 h-5'
  }
  return iconSizes[props.size]
})

// Loading icon sizes
const loadingIconSize = computed(() => {
  const loadingSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-5 h-5'
  }
  return loadingSizes[props.size]
})

// Event handlers
const handleClick = (event: MouseEvent): void => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script> 