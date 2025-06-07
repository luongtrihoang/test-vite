<template>
  <div :class="containerClasses">
    <!-- Spinner Variant -->
    <div v-if="variant === 'spinner'" :class="spinnerClasses">
      <div class="animate-spin rounded-full border-b-2" :class="spinnerSizeClasses"></div>
    </div>

    <!-- Dots Variant -->
    <div v-else-if="variant === 'dots'" class="flex space-x-2">
      <div
        v-for="i in 3"
        :key="i"
        :class="[dotClasses, `animate-bounce`]"
        :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
      ></div>
    </div>

    <!-- Pulse Variant -->
    <div v-else-if="variant === 'pulse'" :class="pulseClasses">
      <div class="animate-pulse rounded" :class="pulseSizeClasses"></div>
    </div>

    <!-- Bars Variant -->
    <div v-else-if="variant === 'bars'" class="flex space-x-1">
      <div
        v-for="i in 4"
        :key="i"
        :class="[barClasses, 'animate-pulse']"
        :style="{ animationDelay: `${(i - 1) * 0.15}s` }"
      ></div>
    </div>

    <!-- Text -->
    <p v-if="text" :class="textClasses">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'gray' | 'green' | 'red' | 'yellow' | 'purple' | 'white'
  text?: string
  center?: boolean
  overlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'spinner',
  size: 'md',
  color: 'blue',
  center: false,
  overlay: false
})

// Container classes
const containerClasses = computed(() => {
  const base = 'flex flex-col items-center justify-center'
  const center = props.center ? 'min-h-32' : ''
  const overlay = props.overlay 
    ? 'fixed inset-0 bg-black bg-opacity-50 z-50' 
    : ''
  
  return [base, center, overlay].filter(Boolean).join(' ')
})

// Spinner classes
const spinnerClasses = computed(() => {
  const colors = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    green: 'border-green-600',
    red: 'border-red-600',
    yellow: 'border-yellow-600',
    purple: 'border-purple-600',
    white: 'border-white'
  }
  
  return colors[props.color]
})

const spinnerSizeClasses = computed(() => {
  const sizes = {
    xs: 'h-3 w-3 border',
    sm: 'h-4 w-4 border',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-2',
    xl: 'h-12 w-12 border-2'
  }
  
  return sizes[props.size]
})

// Dots classes
const dotClasses = computed(() => {
  const colors = {
    blue: 'bg-blue-600',
    gray: 'bg-gray-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    white: 'bg-white'
  }

  const sizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  }
  
  return [colors[props.color], sizes[props.size], 'rounded-full'].join(' ')
})

// Pulse classes
const pulseClasses = computed(() => {
  const colors = {
    blue: 'bg-blue-600',
    gray: 'bg-gray-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    white: 'bg-white'
  }
  
  return colors[props.color]
})

const pulseSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-8 h-2',
    sm: 'w-12 h-3',
    md: 'w-16 h-4',
    lg: 'w-20 h-5',
    xl: 'w-24 h-6'
  }
  
  return sizes[props.size]
})

// Bars classes
const barClasses = computed(() => {
  const colors = {
    blue: 'bg-blue-600',
    gray: 'bg-gray-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    white: 'bg-white'
  }

  const sizes = {
    xs: 'w-0.5 h-3',
    sm: 'w-0.5 h-4',
    md: 'w-1 h-6',
    lg: 'w-1 h-8',
    xl: 'w-1.5 h-10'
  }
  
  return [colors[props.color], sizes[props.size], 'rounded'].join(' ')
})

// Text classes
const textClasses = computed(() => {
  const colors = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    white: 'text-white'
  }

  const sizes = {
    xs: 'text-xs mt-1',
    sm: 'text-sm mt-2',
    md: 'text-base mt-3',
    lg: 'text-lg mt-3',
    xl: 'text-xl mt-4'
  }
  
  return [colors[props.color], sizes[props.size], 'font-medium'].join(' ')
})
</script> 