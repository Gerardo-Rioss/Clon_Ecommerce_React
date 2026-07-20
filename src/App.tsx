import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout/Layout";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home/Home"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const CreateProduct = lazy(() => import("./pages/CreateProduct/CreateProduct"));
const ProductDetail = lazy(
  () => import("./components/product/ProductDetail/ProductDetail")
);
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

// Fallback mientras carga cada ruta
function PageLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
        color: "#999",
        fontSize: "14px",
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          border: "3px solid #e5e5e5",
          borderTopColor: "#3483fa",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          display: "inline-block",
        }}
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/product/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProductDetail />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/createProduct"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateProduct />
                </Suspense>
              }
            />
            <Route
              path="/checkout"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Checkout />
                </Suspense>
              }
            />
            <Route
              path="/404"
              element={
                <Suspense fallback={<PageLoader />}>
                  <NotFound />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
