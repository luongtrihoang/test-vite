// Export all types from a central location
export type * from './user'
export type * from './auth'

// Common utility types
export interface BaseEntity {
  id: number | string
  createdAt?: Date
  updatedAt?: Date
}

export interface PaginationParams {
  page: number
  limit: number
  total?: number
}

export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

export interface FilterParams {
  [key: string]: string | number | boolean | null | undefined
}

// API-related types
export interface ApiError {
  message: string
  code?: string | number
  details?: Record<string, unknown>
}

export interface ApiSuccess<T = unknown> {
  data: T
  message?: string
  meta?: {
    pagination?: PaginationParams
    sorting?: SortParams
    filters?: FilterParams
  }
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError

// Form types
export interface FormState {
  values: Record<string, unknown>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
}

// Route types
export interface RouteParams {
  [key: string]: string | number
}

export interface RouterMeta {
  title?: string
  requiresAuth?: boolean
  roles?: string[]
} 