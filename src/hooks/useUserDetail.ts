import { ref, computed } from 'vue'
import type { User } from '../types/user'

// User detail store using Vue 3 Composition API
const currentUser = ref<User | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

export const useUserDetail = () => {
  // Computed values
  const isLoaded = computed(() => !loading.value && !error.value && currentUser.value !== null)
  
  const userDisplayName = computed(() => {
    if (!currentUser.value) return ''
    return currentUser.value.name
  })

  const userInitials = computed(() => {
    if (!currentUser.value) return ''
    return currentUser.value.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  // Actions
  const fetchUser = async (userId: number): Promise<void> => {
    if (currentUser.value?.id === userId && !error.value) {
      // User already loaded and no error
      return
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found')
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      currentUser.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user'
      currentUser.value = null
    } finally {
      loading.value = false
    }
  }

  const setUser = (user: User): void => {
    currentUser.value = user
    error.value = null
  }

  const clearUser = (): void => {
    currentUser.value = null
    error.value = null
    loading.value = false
  }

  const refreshUser = async (): Promise<void> => {
    if (currentUser.value) {
      await fetchUser(currentUser.value.id)
    }
  }

  // Contact actions
  const sendEmail = (user?: User): void => {
    const targetUser = user || currentUser.value
    if (targetUser) {
      window.location.href = `mailto:${targetUser.email}`
    }
  }

  const callUser = (user?: User): void => {
    const targetUser = user || currentUser.value
    if (targetUser) {
      window.location.href = `tel:${targetUser.phone}`
    }
  }

  const visitWebsite = (user?: User): void => {
    const targetUser = user || currentUser.value
    if (targetUser) {
      window.open(`http://${targetUser.website}`, '_blank', 'noopener,noreferrer')
    }
  }

  // Update user data
  const updateUser = (updatedUser: Partial<User>): void => {
    if (currentUser.value) {
      currentUser.value = { ...currentUser.value, ...updatedUser }
    }
  }

  return {
    // State
    currentUser,
    loading,
    error,
    
    // Computed
    isLoaded,
    userDisplayName,
    userInitials,
    
    // Actions
    fetchUser,
    setUser,
    clearUser,
    refreshUser,
    updateUser,
    
    // Contact actions
    sendEmail,
    callUser,
    visitWebsite
  }
} 