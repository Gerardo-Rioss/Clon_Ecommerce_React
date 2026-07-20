import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.css";
import { Link } from "react-router";
import type { CartProduct } from "../../types/CartContext";
import { formatUSD } from "../../utils/formatPrice";

function formatPriceParts(price: number) {
  const parts = price.toFixed(2).split(".");
  return { integer: parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."), cents: parts[1] };
}

function PriceDisplay({ price }: { price: number }) {
  const { integer, cents } = formatPriceParts(price);
  return (
    <span className={styles.priceInline}>
      <span className={styles.priceSym}>$</span>
      <span className={styles.priceInt}>{integer}</span>
      <span className={styles.priceCent}>{cents}</span>
    </span>
  );
}

function Cart() {
  const {
    cart,
    total,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tu Carrito</h1>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🛒</span>
          <p className={styles.emptyText}>Tu carrito está vacío</p>
          <Link to="/" className={styles.primaryButton}>
            Continuar Comprando
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {/* Lista de productos */}
          <div className={styles.cartContent}>
            {cart.map((product: CartProduct) => (
              <div key={product.id} className={styles.cartItem}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.image}
                  />
                </div>

                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <Link to={`/product/${product.id}`} className={styles.name}>
                      {product.title}
                    </Link>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className={styles.buttonRemove}
                      aria-label={`Eliminar ${product.title}`}
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </div>

                  <div className={styles.quantityRow}>
                    <div className={styles.quantityContainer}>
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        className={styles.quantityButton}
                        aria-label="Reducir"
                      >
                        −
                      </button>
                      <span className={styles.quantity}>
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(product.id)}
                        className={styles.quantityButton}
                        aria-label="Aumentar"
                      >
                        +
                      </button>
                    </div>
                    <PriceDisplay price={product.price * product.quantity} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Resumen</h2>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Productos</span>
              <span>{cart.reduce((s, p) => s + p.quantity, 0)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span>{formatUSD(total * 0.95)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>IVA (5%)</span>
              <span>{formatUSD(total * 0.05)}</span>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.totalAmount}>{formatUSD(total)}</span>
            </div>

            <Link to="/checkout" className={styles.checkoutButton}>
              Proceder al Pago
            </Link>

            <div className={styles.secondaryActions}>
              <Link to="/" className={styles.continueShopping}>
                ← Seguir comprando
              </Link>
              <button onClick={clearCart} className={styles.clearButton}>
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
