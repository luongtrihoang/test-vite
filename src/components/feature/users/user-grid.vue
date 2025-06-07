<template>
  <div>
    <!-- Loading State -->
    <UiLoading 
      v-if="loading" 
      variant="spinner" 
      size="md" 
      color="blue" 
      text="Loading users..." 
      center 
    />

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <ExclamationTriangleIcon class="w-6 h-6 text-red-600 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-red-800 mb-2">Error Loading Users</h3>
      <p class="text-red-600 mb-4">{{ error }}</p>
      <UiButton
        variant="danger"
        size="md"
        text="Try Again"
        @click="$emit('retry')"
      />
    </div>

    <!-- Users Grid -->
    <div v-else-if="users.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden"
      >
        <div class="p-6">
          <!-- User Header -->
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {{ getInitials(user.name) }}
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ user.name }}</h3>
              <p class="text-sm text-gray-600">@{{ user.username }}</p>
            </div>
          </div>

          <!-- User Details -->
          <div class="space-y-3">
            <div class="flex items-center text-sm text-gray-600">
              <EnvelopeIcon class="w-4 h-4 mr-2 text-gray-400" />
              <a :href="`mailto:${user.email}`" class="hover:text-blue-600 transition-colors">
                {{ user.email }}
              </a>
            </div>

            <div class="flex items-center text-sm text-gray-600">
              <PhoneIcon class="w-4 h-4 mr-2 text-gray-400" />
              <a :href="`tel:${user.phone}`" class="hover:text-blue-600 transition-colors">
                {{ user.phone }}
              </a>
            </div>

            <div class="flex items-center text-sm text-gray-600">
              <BuildingOfficeIcon class="w-4 h-4 mr-2 text-gray-400" />
              <span>{{ user.company.name }}</span>
            </div>

            <div class="flex items-center text-sm text-gray-600">
              <MapPinIcon class="w-4 h-4 mr-2 text-gray-400" />
              <span>{{ user.address.city }}, {{ user.address.zipcode }}</span>
            </div>

            <div class="flex items-center text-sm text-gray-600">
              <GlobeAltIcon class="w-4 h-4 mr-2 text-gray-400" />
              <a :href="`http://${user.website}`" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 transition-colors">
                {{ user.website }}
              </a>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-6 flex space-x-2">
            <UiButton 
              variant="primary"
              size="sm"
              text="View Profile"
              block
              @click="$emit('viewProfile', user)"
            />
            <UiButton 
              variant="outline"
              size="sm"
              text="Contact"
              block
              @click="$emit('contact', user)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <UserIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
      <p class="text-gray-600 mb-4">Try adjusting your search criteria or clearing filters.</p>
      <UiButton
        variant="primary"
        size="md"
        text="Clear Filters"
        @click="$emit('clearFilters')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ExclamationTriangleIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  GlobeAltIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import { UiLoading, UiButton } from '../../ui'
import type { User } from '../../../types/user'

// Props
defineProps<{
  users: User[]
  loading: boolean
  error: string | null
}>()

// Emits
defineEmits<{
  retry: []
  viewProfile: [user: User]
  contact: [user: User]
  clearFilters: []
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