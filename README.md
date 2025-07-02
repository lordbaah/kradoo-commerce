# Ecommerce Project

A modern, responsive product listing application built with React, TypeScript, and Tailwind CSS. This project focuses on learning TypeScript fundamentals while implementing product display and filtering functionality.

## ✨ Features

- **Product Listing**: Display products with detailed information from DummyJSON API
- **Category Filtering**: Filter products by different categories
- **Add to Cart**: Add products to cart store in local storage
- **Price Sorting**: Sort products by price (ascending and descending)
- **Name Sorting**: Sort products alphabetically by name
- **Pagination**: Pagination for product lists
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive user interface with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **API**: DummyJSON API for product data
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🌐 Environment Setup

This project requires an environment variable to connect to the DummyJSON API. The API URL is configured through environment variables to make the application flexible and secure.

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ecommerce-project.git
   cd ecommerce-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add:

   ```env
   VITE_API_URL=https://dummyjson.com
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Key Components

```
src/
├── components/          # Product listing and filter components
│   ├── ProductCard/     # Individual product display
│   ├── Pagination/     # Products grid/list
│   ├── CategoryFilter/  # Category selection
│   └── Navbar/     # Price and name sorting
├── types/              # TypeScript type definitions
├── utils/              # API functions and helpers
└── App.tsx             # Main application component
```

## 🌐 API Integration

This project uses the [DummyJSON API](https://dummyjson.com/) to fetch product data and categories.

### Key API Endpoints Used:

- `GET /products` - Fetch all products
- `GET /products/categories` - Fetch product categories
- `GET /products/category/{category}` - Fetch products by category

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience with grid layouts
- **Tablet**: Adapted layouts with touch-friendly interfaces
- **Mobile**: Optimized for small screens with hamburger navigation

## 🎯 Learning Focus

This project was built to learn and practice TypeScript fundamentals:

- **Type Definitions**: Creating interfaces for product data and API responses
- **Type Safety**: Using TypeScript to catch errors during development
- **Props Typing**: Properly typing React component props
- **State Typing**: Type-safe state management with useState
- **API Response Typing**: Handling typed API responses

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Krado** - For the excellent 2-day online bootcamp that made this project possible

**Built with ❤️ during a 2-day intensive bootcamp with Krado**
