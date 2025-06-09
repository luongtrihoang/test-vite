<template>
  <div class="min-h-screen bg-gray-50">
    <UserHeader 
      :user-count="filteredUsers.length"
      :loading="loading"
      @refresh="fetchUsers"
    />

    <UserMainContent
      v-model:search-query="searchQuery"
      v-model:selected-city="selectedCity"
      v-model:selected-company="selectedCompany"
      v-model:sort-by="sortBy"
      :sort-order="sortOrder"
      :unique-cities="uniqueCities"
      :unique-companies="uniqueCompanies"
      @clear-filters="handleClearFilters"
      @toggle-sort-order="handleToggleSortOrder"
    >
      <UserGrid
        :users="filteredUsers"
        :loading="loading"
        :error="error"
        @retry="fetchUsers"
        @view-profile="handleViewProfile"
        @contact="handleContact"
        @clear-filters="handleClearFilters"
      />

      <!-- Load More / Infinite Scroll Trigger -->
      <div v-if="hasMore && !loading" ref="infiniteScrollTrigger" class="py-8">
        <div v-if="loadingMore" class="flex justify-center">
          <div class="flex items-center space-x-2 text-gray-600">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Loading more users...</span>
          </div>
        </div>
        <div v-else class="flex justify-center">
          <UiButton
            variant="primary"
            size="md"
            text="Load More Users"
            @click="loadMoreUsers"
          />
        </div>
      </div>

      <!-- End of Results -->
      <div v-else-if="!hasMore && filteredUsers.length > 0" class="py-8 text-center text-gray-500">
        <p>You've reached the end of the results</p>
      </div>
    </UserMainContent>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import UserHeader from '../components/feature/users/user-header.vue'
import UserMainContent from '../components/feature/users/user-main-content.vue'
import UserGrid from '../components/feature/users/user-grid.vue'
import { UiButton } from '../components/ui'
import { useUsers } from '../hooks/useUsers'
import type { User } from '../types/user'

// Router
const router = useRouter()

// Store
const {
  loading,
  loadingMore,
  error,
  hasMore,
  searchQuery,
  selectedCity,
  selectedCompany,
  sortBy,
  sortOrder,
  uniqueCities,
  uniqueCompanies,
  filteredUsers,
  fetchUsers,
  loadMoreUsers,
  clearFilters,
  toggleSortOrder,
  resetPagination
} = useUsers()

// Refs
const infiniteScrollTrigger = ref<HTMLElement>()

// Methods
const handleViewProfile = (user: User): void => {
  router.push(`/user/${user.id}`)
}

const handleContact = (user: User): void => {
  console.log('Contact user:', user.name)
  // TODO: Implement contact functionality
}

const handleClearFilters = (): void => {
  clearFilters()
}

const handleToggleSortOrder = (): void => {
  toggleSortOrder()
}

// Infinite scroll functionality
const checkInfiniteScroll = (): void => {
  if (!infiniteScrollTrigger.value || loadingMore.value || !hasMore.value) return

  const rect = infiniteScrollTrigger.value.getBoundingClientRect()
  const isVisible = rect.top <= window.innerHeight + 200 // Trigger 200px before element is visible

  if (isVisible) {
    loadMoreUsers()
  }
}

const handleScroll = (): void => {
  requestAnimationFrame(checkInfiniteScroll)
}

// Watch for filter changes and reset pagination
watch([searchQuery, selectedCity, selectedCompany, sortBy], () => {
  resetPagination()
})

// Lifecycle
onMounted(() => {
  fetchUsers()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script> 