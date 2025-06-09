export interface AuthUser {
    id: number
    name: string
    email: string
    username: string
    avatar?: string
    role: 'admin' | 'user'
    lastLogin?: Date
  }
  
  export interface LoginCredentials {
    email: string
    password: string
  }
  
  export interface RegisterData {
    name: string
    email: string
    username: string
    password: string
  }