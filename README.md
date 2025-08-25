# WTWR (What to Wear?)

A React-based weather application that helps users choose appropriate clothing based on current weather conditions.

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

## Project Overview

WTWR is a responsive web application that provides weather-based clothing recommendations. Users can view current weather conditions and browse clothing items organized by weather appropriateness. The app features a clean, modern interface with comprehensive modal functionality for viewing and adding clothing items.

## Features

### Core Functionality

- **Weather Display**: Real-time weather information with temperature and location
- **Clothing Recommendations**: Clothing items fetched from a local API server (json-server)
- **Item Management**: Add and delete clothing items via API (POST/DELETE requests)
- **Item Viewing**: Preview clothing items in a detailed modal view

### User Interface

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Mobile Menu**: Collapsible navigation menu for mobile screens
- **Modal System**: Multiple modal types for different interactions
- **Form Validation**: Complete form handling with validation and disabled submit on invalid input

### Technical Features

- **Modern React**: Built with functional components and hooks
- **API Integration**: All clothing items are managed via a local REST API (json-server)
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
- [json-server](https://github.com/typicode/json-server) (for local API)

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd se_project_react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the local API server (in a separate terminal):

   ```bash
   json-server --watch db.json --port 3001
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

- `GET /items` — Fetch all clothing items
- `POST /items` — Add a new clothing item (name, imageUrl, weather)
- `DELETE /items/:id` — Delete a clothing item by ID

> **Note:** The API is only available locally. The app will not work on GitHub Pages or any remote deployment until the backend is deployed to a public server.

## Changelog

**2025-08-24**

- Switched all clothing item management to use a local REST API (json-server)
- Removed all default/static clothing items from the codebase
- Added form validation and disabled submit button for invalid input
- Updated README to reflect API usage and local-only limitations

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
