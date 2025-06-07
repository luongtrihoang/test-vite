<template>
  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <!-- Loading State -->
    <UiLoading 
      v-if="loading" 
      variant="spinner" 
      size="lg" 
      color="blue" 
      text="Loading user profile..." 
      center 
    />

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <ExclamationTriangleIcon class="w-8 h-8 text-red-600 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-red-800 mb-2">Error Loading Profile</h3>
      <p class="text-red-600 mb-4">{{ error }}</p>
      <UiButton
        variant="danger"
        size="md"
        text="Try Again"
        @click="$emit('retry')"
      />
    </div>

    <!-- User Profile Content -->
    <div v-else-if="user" class="space-y-6">
      <!-- Profile Header -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
          <div class="flex items-center space-x-6">
            <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
              {{ getInitials(user.name) }}
            </div>
            <div class="text-white">
              <h2 class="text-3xl font-bold">{{ user.name }}</h2>
              <p class="text-blue-100 text-lg">@{{ user.username }}</p>
              <p class="text-blue-100">{{ user.company.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content slot for flexible layout -->
      <slot :user="user" />
    </div>

    <!-- User Not Found -->
    <div v-else class="text-center py-12">
      <UserIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">User not found</h3>
      <p class="text-gray-600 mb-4">The requested user profile could not be found.</p>
      <UiButton
        variant="primary"
        size="md"
        text="Go Back"
        @click="$emit('goBack')"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import {
  ExclamationTriangleIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import { UiLoading, UiButton } from '../../ui'
import type { User } from '../../../types/user'

// Props
defineProps<{
  user: User | null
  loading: boolean
  error: string | null
}>()

// Emits
defineEmits<{
  retry: []
  goBack: []
}>()

// Helper function
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script> 