import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthUser, LoginCredentials, RegisterData } from '../types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const currentUser = ref<AuthUser | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))

  // Getters
  const isAuthenticated = computed(() => !!currentUser.value && !!token.value)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const userName = computed(() => currentUser.value?.name || '')
  const userEmail = computed(() => currentUser.value?.email || '')

  // Actions
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock authentication - replace with real API call
      if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        const user: AuthUser = {
          id: 1,
          name: 'Admin User',
          email: credentials.email,
          username: 'admin',
          role: 'admin',
          lastLogin: new Date(),
          avatar: `https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff`
        }
        
        currentUser.value = user
        token.value = 'mock_admin_token_123'
        localStorage.setItem('auth_token', token.value)
        localStorage.setItem('auth_user', JSON.stringify(user))
        
        return true
      } else if (credentials.email === 'user@example.com' && credentials.password === 'user123') {
        const user: AuthUser = {
          id: 2,
          name: 'Regular User',
          email: credentials.email,
          username: 'user',
          role: 'user',
          lastLogin: new Date(),
          avatar: `https://ui-avatars.com/api/?name=Regular+User&background=10b981&color=fff`
        }
        
        currentUser.value = user
        token.value = 'mock_user_token_456'
        localStorage.setItem('auth_token', token.value)
        localStorage.setItem('auth_user', JSON.stringify(user))
        
        return true
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock registration - replace with real API call
      const user: AuthUser = {
        id: Date.now(), // Mock ID
        name: data.name,
        email: data.email,
        username: data.username,
        role: 'user',
        lastLogin: new Date(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=6366f1&color=fff`
      }

      currentUser.value = user
      token.value = `mock_token_${Date.now()}`
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('auth_user', JSON.stringify(user))

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = (): void => {
    currentUser.value = null
    token.value = null
    error.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  const updateProfile = async (updates: Partial<AuthUser>): Promise<boolean> => {
    if (!currentUser.value) return false

    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      currentUser.value = { ...currentUser.value, ...updates }
      localStorage.setItem('auth_user', JSON.stringify(currentUser.value))

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Profile update failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock password validation - replace with real API call
      if (currentPassword.length < 6 || newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Password change failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const checkAuthStatus = async (): Promise<void> => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')

    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        currentUser.value = JSON.parse(storedUser)
        
        // Optionally validate token with API
        // const isValid = await validateToken(storedToken)
        // if (!isValid) {
        //   logout()
        // }
      } catch (err) {
        console.error('Failed to restore auth state:', err)
        logout()
      }
    }
  }

  const clearError = (): void => {
    error.value = null
  }

  // Initialize auth state
  const initialize = async (): Promise<void> => {
    await checkAuthStatus()
  }

  return {
    // State
    currentUser,
    isLoading,
    error,
    token,

    // Getters
    isAuthenticated,
    isAdmin,
    userName,
    userEmail,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    checkAuthStatus,
    clearError,
    initialize
  }
}) 