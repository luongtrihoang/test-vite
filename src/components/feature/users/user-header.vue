<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
          <span class="ml-2 text-sm text-gray-500">({{ userCount }} users)</span>
        </div>
        <div class="flex items-center space-x-4">
          <UiButton 
            variant="primary"
            size="sm"
            :left-icon="ArrowPathIcon"
            :loading="loading"
            text="Refresh"
            @click="$emit('refresh')"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { UiButton } from '../../ui'

// Props
defineProps<{
  userCount: number
  loading: boolean
}>()

// Emits
defineEmits<{
  refresh: []
}>()
</script>
