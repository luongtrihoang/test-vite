<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center space-x-4">
          <UiButton 
            variant="ghost"
            size="sm"
            :left-icon="ArrowLeftIcon"
            text="Back to Users"
            :disabled="loading"
            @click="$emit('goBack')"
          />
          <div class="h-6 border-l border-gray-300"></div>
          <h1 class="text-2xl font-bold text-gray-900">User Profile</h1>
          <span v-if="user" class="text-sm text-gray-500">({{ user.name }})</span>
        </div>
        
        <div class="flex items-center space-x-4">
          <UiButton 
            v-if="user"
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
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { UiButton } from '../../ui'
import type { User } from '../../../types/user'

// Props
defineProps<{
  user: User | null
  loading: boolean
}>()

// Emits
defineEmits<{
  goBack: []
  refresh: []
}>()
</script> 