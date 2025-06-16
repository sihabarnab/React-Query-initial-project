# React TanStack Query CRUD Example

This project is a simple **React** single-page application demonstrating CRUD operations using **TanStack Query** (React Query) for data fetching, caching, and mutation. The UI is styled with **Tailwind CSS** and the backend is powered by a local **JSON server**.

## Features

- **Product List**: Paginated list of products fetched from a mock API.
- **Product Details**: View details of a selected product without page reload.
- **Add Product**: Add a new product using a form; the list updates automatically.
- **Pagination**: Navigate between pages of products.
- **Live Updates**: Product list auto-refreshes every second.
- **Error & Loading States**: User-friendly feedback for loading and errors.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) (for fast development)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/) (for HTTP requests)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)
- [JSON Server](https://github.com/typicode/json-server) (mock REST API)

## How It Works

- **ProductList**: Fetches and displays products with pagination. Each product has a "Details" button.
- **ProductDetails**: Fetches and displays details for the selected product.
- **AddProduct**: Form to add a new product; on success, the product list is refreshed and the form is cleared.
- **App**: Manages the selected product state and composes the main layout.

## How to Run

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start JSON Server:**

   ```sh
   npx json-server --watch server/database/data.json --port 3000
   ```

3. **Start the React app:**

   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## My Work

- Implemented product listing, details, and add product features.
- Integrated TanStack Query for efficient data fetching and mutation.
- Used Tailwind CSS for responsive and modern UI.
- Set up pagination and live data refresh.
- Handled form state and error/loading feedback.

---

**Feel free to use or modify this project as a starting point for your own React + TanStack Query applications.**
