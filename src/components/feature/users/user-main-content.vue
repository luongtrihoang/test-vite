<template>
  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <!-- Filters Header -->
    <UserMainContentHeader
      :search-query="searchQuery"
      :selected-city="selectedCity"
      :selected-company="selectedCompany"
      :sort-by="sortBy"
      :sort-order="sortOrder"
      :unique-cities="uniqueCities"
      :unique-companies="uniqueCompanies"
      @update:search-query="$emit('update:searchQuery', $event)"
      @update:selected-city="$emit('update:selectedCity', $event)"
      @update:selected-company="$emit('update:selectedCompany', $event)"
      @update:sort-by="$emit('update:sortBy', $event)"
      @clear-filters="$emit('clearFilters')"
      @toggle-sort-order="$emit('toggleSortOrder')"
    />

    <!-- Content Slot -->
    <slot />
  </main>
</template>

<script setup lang="ts">
import UserMainContentHeader from './user-main-content-header.vue'

// Props
defineProps<{
  searchQuery: string
  selectedCity: string
  selectedCompany: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
  uniqueCities: string[]
  uniqueCompanies: string[]
}>()

// Emits
defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCity': [value: string]
  'update:selectedCompany': [value: string]
  'update:sortBy': [value: string]
  clearFilters: []
  toggleSortOrder: []
}>()
</script> 