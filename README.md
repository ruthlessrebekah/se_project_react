# WTWR (What to Wear?)

A full-stack React application that helps users choose appropriate clothing based on current weather conditions, featuring user authentication, personal clothing collections, and comprehensive clothing item management.

## About the project

WTWR is a modern web application that combines weather data with personalized clothing recommendations. Users can create accounts, manage their personal clothing collections, and get weather-appropriate outfit suggestions. The app features real-time weather data, user authentication, and a comprehensive clothing item management system.

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [Backend Repository](https://github.com/ruthlessrebekah/se_project_express)

## Project Overview

WTWR is a responsive full-stack web application that provides personalized weather-based clothing recommendations. Users can create accounts, build personal clothing collections, and interact with items through likes and favorites. The app features a comprehensive authentication system, protected routes, and a modern, mobile-first design.

## Features

### User Authentication & Management

- **User Registration**: Complete signup flow with form validation
- **User Login**: Secure authentication with JWT tokens
- **Protected Routes**: Route protection for authenticated users only
- **User Profiles**: Personal profile management with avatar support
- **Session Management**: Persistent login sessions with token validation
- **User Context**: Global user state management throughout the app

### Clothing Item Management

- **Personal Collections**: Users can add, view, and delete their own clothing items
- **Item Interactions**: Like/unlike functionality for clothing items
- **Item Categories**: Organized by weather appropriateness (hot, warm, cold)
- **Item Preview**: Detailed modal view with full-size images
- **Add Items**: Form-based item creation with validation
- **Delete Confirmation**: Confirmation modal for item deletion

### Weather Integration

- **Real-time Weather**: Live weather data from OpenWeatherMap API
- **Location-based**: Weather information for San Antonio, TX
- **Temperature Display**: Fahrenheit/Celsius toggle functionality
- **Weather-based Recommendations**: Clothing suggestions based on current conditions

### User Interface & Experience

- **Responsive Design**: Optimized for desktop (768px+) and mobile (767px and below)
- **Mobile-First Approach**: Progressive enhancement for larger screens
- **Navigation Menus**:
  - Desktop: Header navigation with user avatar and actions
  - Mobile: Hamburger menu with collapsible navigation
- **Modal System**: Comprehensive modal architecture for various interactions
- **Form Validation**: Real-time validation with visual feedback
- **Loading States**: Smooth loading transitions and disabled states
- **Error Handling**: User-friendly error messages and fallbacks

### Advanced Features

- **Image Error Handling**: Graceful fallbacks for broken image URLs
- **Text Overflow Management**: Ellipsis truncation for long text content
- **Hover Effects**: Interactive feedback for all clickable elements
- **Double-click Protection**: Enhanced text selection behavior
- **Avatar Placeholders**: Personalized avatar fallbacks with user initials
- **Temperature Unit Toggle**: Persistent F/C preference in mobile menu
- **Clickable Navigation**: Username in mobile menu links to profile page

## Technology Stack

### Frontend

- **React 18+**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing with protected routes
- **Context API**: Global state management for user authentication
- **Vite**: Fast build tool and development server
- **CSS3**: Custom properties, flexbox, grid, and media queries
- **Cabinet Grotesk**: Custom typography throughout the application

### Backend Integration

- **Express.js API**: RESTful API for user and clothing item management
- **JWT Authentication**: Token-based authentication system
- **MongoDB**: Database for user profiles and clothing items
- **Axios/Fetch**: HTTP client for API communication

### Development Tools

- **ESLint**: Code quality and consistency
- **Git**: Version control with branching workflow
- **npm**: Package management and script execution

## Project Structure

```
src/
├── components/
│   ├── App/                    # Main app component with routing
│   ├── Header/                 # Navigation, weather, and user controls
│   ├── Main/                   # Weather display and clothing recommendations
│   ├── Profile/                # User profile page layout
│   ├── SideBar/                # User profile sidebar with actions
│   ├── ClothesSection/         # Personal clothing collection display
│   ├── WeatherCard/            # Weather information component
│   ├── ItemCard/               # Individual clothing item cards
│   ├── ItemModal/              # Clothing item preview modal
│   ├── AddItemModal/           # Add new clothing item form
│   ├── LoginModal/             # User login form modal
│   ├── RegisterModal/          # User registration form modal
│   ├── ConfirmationModal/      # Delete confirmation dialog
│   ├── MenuModal/              # Mobile navigation menu
│   ├── ModalWithForm/          # Reusable form modal component
│   ├── ToggleSwitch/           # Temperature unit toggle
│   ├── ProtectedRoute/         # Route protection wrapper
│   └── Footer/                 # Site footer
├── contexts/
│   ├── CurrentUserContext.jsx  # Global user state management
│   └── CurrentTemperatureUnitContext.jsx # Temperature unit state
├── hooks/
│   └── useForm.js              # Custom form handling hook
├── utils/
│   ├── api.js                  # Backend API communication
│   ├── auth.js                 # Authentication utilities
│   ├── weatherApi.js           # Weather API integration
│   └── constants.js            # Application constants
├── assets/                     # Images, icons, and static assets
└── vendor/                     # Third-party CSS and fonts
```

## Design System

### Responsive Breakpoints

- **Desktop**: 768px and above - Full layout with sidebar navigation
- **Mobile**: 767px and below - Compact layout with hamburger menu and stacked content

### Component Specifications

- **Modals**: Consistent sizing (670x280px for confirmations, mobile-optimized dimensions)
- **Buttons**: Standardized spacing, hover effects, and disabled states
- **Forms**: Inline validation, error messaging, and accessibility features
- **Cards**: Fixed dimensions (325x328px desktop, responsive mobile)
- **Avatars**: Consistent sizing (40x40px header, 56x56px profile)

### Mobile Optimizations

- **Touch-friendly**: Proper touch target sizes and spacing
- **Thumb Navigation**: Easy-to-reach navigation elements
- **Readable Text**: Optimized font sizes and line heights
- **Efficient Layouts**: Minimal scrolling and intuitive information hierarchy

## Authentication Flow

1. **Registration**: Users create accounts with email/password
2. **Login**: JWT token generation and storage
3. **Route Protection**: Automatic redirection for unauthenticated users
4. **Session Persistence**: Token validation on app initialization
5. **Logout**: Secure token removal and state cleanup

## API Integration

### Authentication Endpoints

- `POST /signup` — User registration
- `POST /signin` — User login
- `GET /users/me` — Get current user profile

### Clothing Item Endpoints

- `GET /items` — Fetch all clothing items
- `POST /items` — Add new clothing item
- `DELETE /items/:id` — Delete clothing item
- `PUT /items/:id/likes` — Like clothing item
- `DELETE /items/:id/likes` — Unlike clothing item

### Weather Integration

- **OpenWeatherMap API**: Real-time weather data
- **Location**: San Antonio, TX coordinates
- **Units**: Imperial/Metric conversion support

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- MongoDB database
- OpenWeatherMap API key

### Installation

1. **Clone the repositories:**

   ```bash
   git clone [frontend-repository-url]
   git clone [backend-repository-url]
   ```

2. **Setup Backend:**

   ```bash
   cd se_project_express
   npm install
   # Add environment variables (MongoDB, JWT secret)
   npm start
   ```

3. **Setup Frontend:**

   ```bash
   cd se_project_react
   npm install
   npm run dev
   ```

4. **Environment Configuration:**
   - Backend: Configure MongoDB connection and JWT secret
   - Frontend: Set API base URL in constants

### Available Scripts

**Frontend:**

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

**Backend:**

- `npm start` — Start production server
- `npm run dev` — Start development server with nodemon

## Recent Updates & Improvements

### Authentication System (Latest Release)

- Implemented complete user registration and login system
- Added JWT-based authentication with secure token management
- Created protected routes for authenticated users only
- Developed user profile management with avatar support

### Mobile Responsive Design

- Redesigned entire application for mobile-first approach
- Implemented hamburger menu navigation for mobile devices
- Optimized all components for touch interaction
- Added mobile-specific modal layouts and sizing

### User Experience Enhancements

- Added comprehensive form validation with real-time feedback
- Implemented loading states and error handling throughout app
- Created confirmation dialogs for destructive actions
- Added hover effects and visual feedback for all interactive elements

### Advanced UI Features

- Text overflow management with ellipsis truncation
- Image error handling with graceful fallbacks
- Double-click text selection improvements
- Clickable usernames for improved navigation
- Consistent spacing and typography system

### Backend Integration

- Complete API integration for all CRUD operations
- User authentication and session management
- Clothing item like/unlike functionality
- Real-time weather data integration

## Future Enhancements

- **Profile Editing**: Complete user profile management
- **Image Upload**: Direct image upload for clothing items
- **Weather Forecasts**: Multi-day weather predictions
- **Clothing Categories**: Advanced filtering and organization
- **Social Features**: Sharing outfits and recommendations
- **Geolocation**: Automatic location-based weather
- **Outfit Planning**: Calendar-based outfit scheduling

## Contributing

This project is part of a software engineering bootcamp curriculum. The codebase demonstrates modern React development practices, full-stack integration, and responsive design principles.

## License

This project is licensed under the MIT License.
