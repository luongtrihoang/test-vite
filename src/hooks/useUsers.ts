import { ref, computed } from 'vue'
import type { User } from '../types/user'

// User store using Vue 3 Composition API
const allUsers = ref<User[]>([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref<string | null>(null)
const hasMore = ref(true)

// Pagination
const pageSize = ref(6)
const currentPage = ref(0)

// Search and filter state
const searchQuery = ref('')
const selectedCity = ref('')
const selectedCompany = ref('')
const sortBy = ref<'name' | 'email' | 'company' | 'city'>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')

export const useUsers = () => {
  // Computed values
  const uniqueCities = computed(() => {
    const cities = allUsers.value.map(user => user.address.city)
    return [...new Set(cities)].sort()
  })

  const uniqueCompanies = computed(() => {
    const companies = allUsers.value.map(user => user.company.name)
    return [...new Set(companies)].sort()
  })

  const filteredUsers = computed(() => {
    let filtered = allUsers.value

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query) ||
        user.address.city.toLowerCase().includes(query)
      )
    }

    // City filter
    if (selectedCity.value) {
      filtered = filtered.filter(user => user.address.city === selectedCity.value)
    }

    // Company filter
    if (selectedCompany.value) {
      filtered = filtered.filter(user => user.company.name === selectedCompany.value)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: string
      let bValue: string

      switch (sortBy.value) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'email':
          aValue = a.email
          bValue = b.email
          break
        case 'company':
          aValue = a.company.name
          bValue = b.company.name
          break
        case 'city':
          aValue = a.address.city
          bValue = b.address.city
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      const comparison = aValue.localeCompare(bValue)
      return sortOrder.value === 'asc' ? comparison : -comparison
    })

    return filtered
  })

  const displayedFilteredUsers = computed(() => {
    const filtered = filteredUsers.value
    const endIndex = (currentPage.value + 1) * pageSize.value
    return filtered.slice(0, endIndex)
  })

  // Update hasMore based on filtered results
  const updateHasMore = () => {
    const filtered = filteredUsers.value
    const displayedCount = displayedFilteredUsers.value.length
    hasMore.value = displayedCount < filtered.length
  }

  // Actions
  const fetchUsers = async (): Promise<void> => {
    loading.value = true
    error.value = null
    currentPage.value = 0
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      allUsers.value = data
      updateHasMore()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }

  const loadMoreUsers = async (): Promise<void> => {
    if (loadingMore.value || !hasMore.value) return

    loadingMore.value = true
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      currentPage.value += 1
      updateHasMore()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load more users'
    } finally {
      loadingMore.value = false
    }
  }

  const clearFilters = (): void => {
    searchQuery.value = ''
    selectedCity.value = ''
    selectedCompany.value = ''
    sortBy.value = 'name'
    sortOrder.value = 'asc'
    currentPage.value = 0
    updateHasMore()
  }

  const toggleSortOrder = (): void => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    currentPage.value = 0
    updateHasMore()
  }

  const addUser = (user: User): void => {
    allUsers.value.push(user)
    updateHasMore()
  }

  const updateUser = (updatedUser: User): void => {
    const index = allUsers.value.findIndex(user => user.id === updatedUser.id)
    if (index !== -1) {
      allUsers.value[index] = updatedUser
      updateHasMore()
    }
  }

  const deleteUser = (userId: number): void => {
    allUsers.value = allUsers.value.filter(user => user.id !== userId)
    updateHasMore()
  }

  // Watch for filter changes and reset pagination
  const resetPagination = (): void => {
    currentPage.value = 0
    updateHasMore()
  }

  return {
    // State
    users: allUsers,
    loading,
    loadingMore,
    error,
    hasMore,
    searchQuery,
    selectedCity,
    selectedCompany,
    sortBy,
    sortOrder,
    
    // Computed
    uniqueCities,
    uniqueCompanies,
    filteredUsers: displayedFilteredUsers,
    
    // Actions
    fetchUsers,
    loadMoreUsers,
    clearFilters,
    toggleSortOrder,
    addUser,
    updateUser,
    deleteUser,
    resetPagination
  }
} 