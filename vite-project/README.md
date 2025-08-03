# WTWR (What to Wear?)

A React-based weather application that helps users choose appropriate clothing based on current weather conditions.

## Project Overview

WTWR is a responsive web application that provides weather-based clothing recommendations. Users can view current weather conditions and browse clothing items organized by weather appropriateness. The app features a clean, modern interface with comprehensive modal functionality for viewing and adding clothing items.

## Features

### Core Functionality

- **Weather Display**: Real-time weather information with temperature and location
- **Clothing Recommendations**: Curated clothing items based on current weather conditions
- **Item Management**: Add new clothing items through a comprehensive form modal
- **Item Viewing**: Preview clothing items in a detailed modal view

### User Interface

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Mobile Menu**: Collapsible navigation menu for mobile screens
- **Modal System**: Multiple modal types for different interactions
- **Form Validation**: Complete form handling with validation

### Technical Features

- **Modern React**: Built with functional components and hooks
- **CSS Modules**: Component-based styling architecture
- **Accessibility**: Keyboard navigation and screen reader support
- **Cross-browser**: Compatible with modern web browsers

## Technology Stack

- **Frontend**: React 18+ with Vite
- **Styling**: CSS3 with custom properties and media queries
- **Typography**: Cabinet Grotesk font family
- **Build Tool**: Vite for fast development and building
- **Code Quality**: ESLint for code linting

## Project Structure

```
src/
├── components/
│   ├── App/           # Main application component
│   ├── Header/        # Navigation and weather display
│   ├── Main/          # Content area with clothing items
│   ├── Footer/        # Site footer
│   ├── WeatherCard/   # Weather information display
│   ├── ItemCard/      # Individual clothing item cards
│   ├── ItemModal/     # Clothing item preview modal
│   ├── ModalWithForm/ # Add clothing item form modal
│   └── MenuModal/     # Mobile navigation menu
├── assets/            # Images and static assets
├── utils/             # Utility functions and constants
└── vendor/            # Third-party CSS and fonts
```

## Design Features

### Responsive Breakpoints

- **Desktop**: 768px and above - Full layout with sidebar navigation
- **Mobile**: 767px and below - Compact layout with hamburger menu

### Modal System

- **Add Garment Modal**: Form for adding new clothing items with validation
- **Item Preview Modal**: Full-screen clothing item display
- **Menu Modal**: Mobile navigation with user profile and actions

### Styling Approach

- **Mobile-first**: Progressive enhancement for larger screens
- **Consistent Spacing**: Systematic spacing scale throughout the app
- **Modern Aesthetics**: Clean lines, subtle shadows, and rounded corners

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd se_project_react/vite-project
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

- Weather API integration for live weather data
- User authentication and personal clothing collections
- Clothing item categories and filtering
- Weather forecast integration
- Image upload functionality for custom clothing items

## Contributing

This project was developed as part of a software engineering bootcamp. Contributions and suggestions are welcome!

## License

This project is licensed under the MIT License.
