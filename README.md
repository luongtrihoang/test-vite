# Vue User Management App

A modern, responsive user management application built with Vue 3, TypeScript, and Tailwind CSS. Features infinite scroll, advanced filtering, and detailed user profiles with a beautiful, component-based design system.

![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🎯 Core Functionality
- **User List Management** - Browse and manage users with infinite scroll
- **Advanced Search** - Real-time search with debounced input (300ms)
- **Smart Filtering** - Filter by city, company, and other criteria
- **Dynamic Sorting** - Sort by name, email, company, or city (ascending/descending)
- **User Profiles** - Detailed user information pages
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### 🚀 Technical Features
- **Infinite Scroll** - Load 6 users initially, more on scroll
- **State Management** - Centralized stores for users and user details
- **Component Architecture** - Modular, reusable components
- **Type Safety** - Full TypeScript implementation
- **Modern UI** - Custom design system with 8 button variants
- **Performance Optimized** - Lazy loading and efficient rendering

### 🎨 UI Components
- **UiButton** - 8 variants (primary, secondary, success, danger, warning, info, ghost, outline)
- **UiSelect** - Dropdown with clear functionality and loading states
- **UiInputDebounce** - Debounced search input with clear button
- **UiLoading** - Multiple loading variants (spinner, dots, pulse, bars)

## 🛠️ Tech Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Heroicons
- **Routing:** Vue Router 4
- **API:** JSONPlaceholder (REST API)
- **State Management:** Vue Composition API (Reactive stores)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd vue/test-vite
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
test-vite/
├── src/
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── UiButton.vue       # Button component (8 variants)
│   │   │   ├── UiSelect.vue       # Select dropdown
│   │   │   ├── UiInputDebounce.vue # Debounced input
│   │   │   ├── UiLoading.vue      # Loading states
│   │   │   └── index.ts           # Component exports
│   │   └── feature/               # Feature-specific components
│   │       ├── users/             # User list components
│   │       │   ├── user-header.vue
│   │       │   ├── user-main-content.vue
│   │       │   ├── user-main-content-header.vue
│   │       │   └── user-grid.vue
│   │       └── user-details/      # User profile components
│   │           ├── user-detail-header.vue
│   │           └── user-detail-main.vue
│   ├── pages/
│   │   ├── users.vue              # User list page
│   │   └── user-profile.vue       # User detail page
│   ├── stores/
│   │   ├── userStore.ts           # User list state management
│   │   ├── userDetailStore.ts     # User detail state management
│   │   └── index.ts               # Store exports
│   ├── types/
│   │   ├── user.ts                # User type definitions
│   │   └── index.ts               # Type exports
│   ├── router/
│   │   └── index.ts               # Vue Router configuration
│   ├── App.vue                    # Root component
│   ├── main.ts                    # Application entry point
│   └── style.css                  # Global styles
├── public/                        # Static assets
├── .github/workflows/             # GitHub Actions
├── dist/                          # Build output
├── deploy.sh                      # Deployment script
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json                   # Dependencies and scripts
```

## 🎯 Usage

### User List Page (`/`)
- **Browse Users:** Scroll through the user list with infinite scroll
- **Search:** Use the search bar to find users by name, email, company, or city
- **Filter:** Select specific cities or companies from dropdown filters
- **Sort:** Choose sorting criteria and toggle ascending/descending order
- **View Profile:** Click "View Profile" to see detailed user information

### User Profile Page (`/user/:id`)
- **Detailed Information:** View complete user profile with contact details
- **Contact Actions:** Send email, make phone calls, or visit websites
- **Navigation:** Use the back button to return to the user list

### Features Showcase
- **Infinite Scroll:** Initially loads 6 users, automatically loads more on scroll
- **Real-time Search:** 300ms debounced search with instant filtering
- **Smart Filtering:** Combine search, city filter, and company filter
- **Responsive Design:** Optimized for mobile, tablet, and desktop
- **Loading States:** Beautiful loading indicators throughout the app

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options

#### 1. Vercel (Recommended)
```bash
npm run deploy:vercel
```

#### 2. Netlify
```bash
npm run build
# Then drag the dist folder to netlify.com
```

#### 3. GitHub Pages
```bash
git push origin main
# Auto-deploys via GitHub Actions
```

#### 4. Surge.sh
```bash
npm run deploy:surge
```

#### 5. Custom Deployment
```bash
./deploy.sh
```

## 🧪 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
npm run deploy:vercel    # Deploy to Vercel
npm run deploy:surge     # Deploy to Surge
npm run deploy:preview   # Build and preview locally
```

## 🏗️ Architecture

### State Management
- **userStore.ts** - Manages user list, pagination, filtering, and sorting
- **userDetailStore.ts** - Handles individual user profile data and actions

### Component Design
- **Atomic Design** - Reusable UI components (atoms) composed into features (molecules/organisms)
- **Feature-based** - Components organized by feature areas
- **Type-safe** - Full TypeScript implementation with strict types

### API Integration
- **JSONPlaceholder API** - Fetches user data from `https://jsonplaceholder.typicode.com/users`
- **Smart Caching** - Avoids unnecessary API calls with intelligent data management
- **Error Handling** - Comprehensive error states with retry functionality

## 🎨 Design System

### Button Variants
- **Primary** - Main actions (blue)
- **Secondary** - Secondary actions (gray)
- **Success** - Positive actions (green)
- **Danger** - Destructive actions (red)
- **Warning** - Warning actions (yellow)
- **Info** - Informational actions (cyan)
- **Ghost** - Subtle actions (transparent)
- **Outline** - Bordered actions (outlined)

### Colors
- **Primary:** Blue (#3B82F6)
- **Success:** Green (#10B981)
- **Danger:** Red (#EF4444)
- **Warning:** Yellow (#F59E0B)
- **Info:** Cyan (#06B6D4)
- **Gray Scale:** Tailwind gray palette

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Reference

### JSONPlaceholder Endpoints
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch specific user

### User Data Structure
```typescript
interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
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
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}
```

## 🔧 Configuration

### Environment Variables
No environment variables required - uses public JSONPlaceholder API.

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  base: '/vue/', // Adjust for your deployment path
})
```

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake REST API for testing
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

**Made with ❤️ using Vue 3, TypeScript, and Tailwind CSS**
