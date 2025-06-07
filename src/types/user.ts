// User types based on JSONPlaceholder API structure
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

// Additional user-related types
export interface UserFilters {
  searchQuery: string
  selectedCity: string
  selectedCompany: string
}

export interface UserSorting {
  sortBy: 'name' | 'email' | 'company' | 'city'
  sortOrder: 'asc' | 'desc'
}

export interface UserState {
  users: User[]
  loading: boolean
  error: string | null
  filters: UserFilters
  sorting: UserSorting
}

// API response types
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export type UsersApiResponse = ApiResponse<User[]> 