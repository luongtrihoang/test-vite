<template>
  <div class="bg-white p-6 rounded-lg shadow mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search -->
      <UiInputDebounce
        :model-value="searchQuery"
        @update:model-value="handleSearchUpdate"
        :icon="MagnifyingGlassIcon"
        type="search"
        placeholder="Search users..."
        clearable
        :debounce-ms="300"
      />

      <!-- City Filter -->
      <UiSelect
        :model-value="selectedCity"
        @update:model-value="handleCityUpdate"
        :options="cityOptions"
        placeholder="All Cities"
      />

      <!-- Company Filter -->
      <UiSelect
        :model-value="selectedCompany"
        @update:model-value="handleCompanyUpdate"
        :options="companyOptions"
        placeholder="All Companies"
      />

      <!-- Sort -->
      <UiSelect
        :model-value="sortBy"
        @update:model-value="handleSortUpdate"
        :options="sortOptions"
      />
    </div>

    <!-- Clear Filters and Sort Order -->
    <div class="mt-4 flex justify-between items-center">
      <UiButton
        variant="ghost"
        size="sm"
        :left-icon="XMarkIcon"
        text="Clear Filters"
        @click="$emit('clearFilters')"
      />
      
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-600">Sort Order:</span>
        <UiButton
          variant="outline"
          size="sm"
          :left-icon="sortOrder === 'asc' ? ArrowUpIcon : ArrowDownIcon"
          :text="sortOrder === 'asc' ? 'Ascending' : 'Descending'"
          @click="$emit('toggleSortOrder')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/vue/24/outline'
import { UiInputDebounce, UiSelect, UiButton } from '../../ui'

// Props
const props = defineProps<{
  searchQuery: string
  selectedCity: string
  selectedCompany: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
  uniqueCities: string[]
  uniqueCompanies: string[]
}>()

// Emits
const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCity': [value: string]
  'update:selectedCompany': [value: string]
  'update:sortBy': [value: string]
  clearFilters: []
  toggleSortOrder: []
}>()

// Event handlers
const handleSearchUpdate = (value: string | number): void => {
  emit('update:searchQuery', String(value))
}

const handleCityUpdate = (value: string | number): void => {
  emit('update:selectedCity', String(value))
}

const handleCompanyUpdate = (value: string | number): void => {
  emit('update:selectedCompany', String(value))
}

const handleSortUpdate = (value: string | number): void => {
  emit('update:sortBy', String(value))
}

// Computed options for selects
const cityOptions = computed(() => [
  '',
  ...props.uniqueCities
])

const companyOptions = computed(() => [
  '',
  ...props.uniqueCompanies
])

const sortOptions = computed(() => [
  { value: 'name', label: 'Sort by Name' },
  { value: 'email', label: 'Sort by Email' },
  { value: 'company', label: 'Sort by Company' },
  { value: 'city', label: 'Sort by City' }
])
</script> 