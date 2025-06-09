<template>
  <div class="min-h-screen bg-gray-50">
    <UserDetailHeader 
      :user="currentUser" 
      :loading="loading"
      @go-back="goBack"
      @refresh="refreshUser"
    />
    
    <UserDetailMain
      :user="currentUser"
      :loading="loading" 
      :error="error"
      @retry="fetchUserProfile"
      @go-back="goBack"
    >
      <!-- User Details Content -->
      <div v-if="currentUser" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Contact Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <UserIcon class="w-5 h-5 mr-2 text-gray-400" />
            Contact Information
          </h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <EnvelopeIcon class="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p class="text-sm text-gray-500">Email</p>
                <a :href="`mailto:${currentUser.email}`" class="text-blue-600 hover:text-blue-800 transition-colors">
                  {{ currentUser.email }}
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <PhoneIcon class="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p class="text-sm text-gray-500">Phone</p>
                <a :href="`tel:${currentUser.phone}`" class="text-blue-600 hover:text-blue-800 transition-colors">
                  {{ currentUser.phone }}
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <GlobeAltIcon class="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p class="text-sm text-gray-500">Website</p>
                <a :href="`http://${currentUser.website}`" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 transition-colors">
                  {{ currentUser.website }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Address Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPinIcon class="w-5 h-5 mr-2 text-gray-400" />
            Address
          </h3>
          <div class="space-y-2">
            <p class="text-gray-900">{{ currentUser.address.street }}</p>
            <p class="text-gray-900">{{ currentUser.address.suite }}</p>
            <p class="text-gray-900">{{ currentUser.address.city }}, {{ currentUser.address.zipcode }}</p>
            <div class="mt-4">
              <p class="text-sm text-gray-500 mb-1">Coordinates</p>
              <p class="text-gray-700">
                Lat: {{ currentUser.address.geo.lat }}, Lng: {{ currentUser.address.geo.lng }}
              </p>
            </div>
          </div>
        </div>

        <!-- Company Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BuildingOfficeIcon class="w-5 h-5 mr-2 text-gray-400" />
            Company
          </h3>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">Company Name</p>
              <p class="text-gray-900 font-medium">{{ currentUser.company.name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Catchphrase</p>
              <p class="text-gray-700 italic">"{{ currentUser.company.catchPhrase }}"</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Business</p>
              <p class="text-gray-700">{{ currentUser.company.bs }}</p>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <InformationCircleIcon class="w-5 h-5 mr-2 text-gray-400" />
            Additional Information
          </h3>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">User ID</p>
              <p class="text-gray-900">#{{ currentUser.id }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Username</p>
              <p class="text-gray-900">{{ currentUser.username }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex flex-wrap gap-4">
          <UiButton 
            variant="primary"
            size="md"
            :left-icon="EnvelopeIcon"
            text="Send Email"
            @click="sendEmail()"
          />
          
          <UiButton 
            variant="success"
            size="md"
            :left-icon="PhoneIcon"
            text="Call User"
            @click="callUser()"
          />
          
          <UiButton 
            variant="info"
            size="md"
            :left-icon="GlobeAltIcon"
            text="Visit Website"
            @click="visitWebsite()"
          />
        </div>
      </div>
    </UserDetailMain>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import UserDetailHeader from '../components/feature/user-details/user-detail-header.vue'
import UserDetailMain from '../components/feature/user-details/user-detail-main.vue'
import { UiButton } from '../components/ui'
import { useUserDetail } from '../composables/useUserDetail'
import { useUsers } from '../composables/useUsers'

// Router
const route = useRoute()
const router = useRouter()

// Stores
const userDetail = useUserDetail()
const user = useUsers()

// Computed
const userId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string)
})

// Store state
const { 
  currentUser, 
  loading, 
  error, 
  fetchUser, 
  setUser, 
  clearUser, 
  refreshUser,
  sendEmail,
  callUser,
  visitWebsite
} = userDetail

// Methods
const fetchUserProfile = async (): Promise<void> => {
  // Try to get user from userStore first (if available)
  const storeUser = user.users.value.find(u => u.id === userId.value)
  
  if (storeUser) {
    setUser(storeUser)
  } else {
    // Fetch from API using detail store
    await fetchUser(userId.value)
  }
}

const goBack = (): void => {
  router.push('/')
}

// Lifecycle
onMounted(() => {
  fetchUserProfile()
})

onUnmounted(() => {
  clearUser()
})
</script> 