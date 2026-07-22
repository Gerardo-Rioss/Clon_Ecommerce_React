# MeliStyle 🛍️

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite)](https://vite.dev)
[![MUI](https://img.shields.io/badge/MUI-7-007FFF?logo=mui)](https://mui.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://ecommerce-react-clon.vercel.app)

> A polished e-commerce front-end inspired by Mercado Libre Argentina — built with React 19, TypeScript, and Material-UI. Features a complete shopping cart flow, product catalog with filtering, and a dark mode that doesn't hurt your eyes.

## ✨ Features

- **Product Catalog** — Browse, search, and filter products from the [FakeStore API](https://fakestoreapi.com/)
- **Advanced Filtering** — By category, price range, and keyword search, persisted in URL params
- **Shopping Cart** — Persistent cart with quantity controls, subtotals, and validation
- **Checkout Flow** — Multi-step checkout with Formik + Yup validation (name, email, phone, address)
- **Responsive Design** — Mobile-first with collapsible sidebar overlay and hamburger menu
- **Dark Mode** — CSS custom properties-based theme with `localStorage` persistence and system preference detection
- **Loading Skeletons** — MUI Skeleton components for all async views
- **Performance Optimized** — Route-level code splitting (`React.lazy`), manual vendor chunking, 227 KB main bundle
- **Premium Price Display** — Superscript cents and installment info (inspired by real Meli UI)
- **Free Shipping Badge** — Dynamic badge on qualifying products

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite 6.3 + SWC |
| **UI Library** | Material-UI 7 (MUI) |
| **Routing** | React Router 7 |
| **Data Fetching** | TanStack React Query 5 |
| **Forms** | Formik + Yup |
| **HTTP Client** | Axios |
| **Icons** | React Icons (Hi) + MUI Icons |
| **Font** | Inter (Google Fonts) |
| **Styling** | CSS Modules + CSS Custom Properties |

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Gerardo-Rioss/Clon_Ecommerce_React.git
cd Clon_Ecommerce_React

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Checkout/            # Checkout form + confirmation
│   ├── Footer/              # Site footer with links
│   ├── Header/              # Main header + bottom nav bar
│   ├── Layout/              # App shell (grid layout)
│   ├── MaterialComponent/   # MUI wrappers (cart badge, spinner)
│   ├── NotFound/            # 404 page
│   ├── SideBar/             # Collapsible filter sidebar
│   ├── Skeleton/            # Loading skeleton components
│   └── product/
│       ├── ProductCard/     # Product card (grid item)
│       ├── ProductDetail/   # Single product view
│       ├── ProductForm/     # Create product form
│       └── ProductList/     # Product grid wrapper
├── context/
│   ├── CartContext.tsx      # Shopping cart state (Context + useReducer-ready)
│   └── ThemeContext.tsx     # Dark/light theme with localStorage persistence
├── hooks/
│   ├── useCategories.ts    # Categories query
│   ├── useDebounce.ts      # Generic debounce hook
│   ├── useProductFilters.ts# URL-param-based product filtering
│   └── useProducts.ts      # Products query
├── pages/
│   ├── Cart/                # Cart page
│   ├── CreateProduct/       # Product creation page
│   └── Home/                # Homepage with product grid
├── services/
│   └── api.ts               # Axios API client (FakeStore)
├── styles/
│   └── tokens.css           # Design system CSS custom properties
├── types/                   # TypeScript interfaces
├── utils/
│   ├── filters.ts           # Legacy filter utilities
│   ├── formatPrice.ts       # Price formatting (USD/ARS)
│   └── searchParams.ts      # URLSearchParams helpers
├── App.tsx                  # Root component with lazy routes
├── main.tsx                 # Entry point (providers)
└── index.css                # Global styles + imports tokens
```

## 🎨 Design System

The entire visual language is driven by CSS custom properties defined in `src/styles/tokens.css`:

```css
--color-primary: #ffe600;        /* Meli yellow */
--color-accent: #3483fa;         /* Meli blue */
--color-free-shipping: #00a650;  /* Shipping green */
--text-price: #333333;           /* Dark price text */
--bg-page: #ebebeb;              /* Page background */
--font-family: 'Inter', ...;     /* Primary font */
```

Dark mode is handled by a single `.dark` class on `<html>` that overrides every variable:

```css
.dark {
  --bg-page: #121212;
  --bg-card: #1e1e1e;
  --text-primary: #e8e8e8;
  /* ... 30+ overrides */
}
```

## 🧠 Architecture Decisions

### Why CSS Custom Properties instead of a CSS-in-JS library?

CSS custom properties are natively supported, have zero runtime cost, and make dark mode trivially simple — just toggle a class on the root element. Every component that uses `var(--bg-card)` automatically adapts. No styled-components, no emotion runtime — just pure CSS.

### Why React.lazy + manual Vite chunks?

The initial bundle was 511 KB (monolithic). By splitting into:
- `vendor-react` (React, Router) — 47 KB
- `vendor-mui` (MUI core + icons) — 109 KB
- `vendor-form` (Formik + Yup) — 73 KB
- `vendor-query` (React Query) — 37 KB
- Route-level lazy chunks (1–7 KB each)

...the main app code drops to 227 KB and pages load on demand. This follows the PRPL pattern.

### Why URL-based search params for filters?

Storing filters in URL search params (`?search=phone&category=electronics`) makes them:
- **Shareable** — send a link with filters applied
- **Server-renderable** — the initial state comes from the URL
- **Back-button-safe** — browser history works naturally

### Why Formik + Yup in Checkout?

The original checkout used raw `useState` with HTML5 validation. Migrating to Formik + Yup gives:
- Declarative validation rules
- Per-field error messages in Spanish
- Async submission handling
- Consistent UX with the Create Product form

## 🌐 Demo

**Live:** [ecommerce-react-clon.vercel.app](https://ecommerce-react-clon.vercel.app)

## 📝 License

MIT — see [LICENSE](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Gerardo-Rioss">Gerardo Ríos</a>
</p>
