import type { Product } from "../../../types/Product";
import styles from "./ProductDetail.module.css";
import { useCart } from "../../../context/CartContext";
import { useParams } from "react-router";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";
import { SkeletonDetail } from "../../Skeleton/SkeletonCard";

function formatPriceParts(price: number) {
  const parts = price.toFixed(2).split(".");
  return { integer: parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."), cents: parts[1] };
}

function StarRating({ rate }: { rate: number }) {
  const fullStars = Math.round(rate);
  const stars = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  return <span className={styles.stars}>{stars}</span>;
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, isInCart } = useCart();

  const { data: product, error, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => api.getProductById(Number(id)),
  });

  if (isLoading) {
    return <SkeletonDetail />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error al cargar productos</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Producto no encontrado</p>
        <Link to="/" className={styles.backLink}>
          Volver al inicio
        </Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const { integer, cents } = formatPriceParts(product.price);
  const installmentPrice = (product.price / 6).toFixed(2).replace(".", ",");
  const hasFreeShipping = product.price > 50;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.name}>{product.title}</h1>
          <div className={styles.ratingRow}>
            <StarRating rate={product.rating.rate} />
            <span className={styles.ratingCount}>
              {product.rating.count} reviews
            </span>
          </div>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.priceSymbol}>$</span>
          <span className={styles.priceInteger}>{integer}</span>
          <span className={styles.priceCents}>{cents}</span>
        </div>

        {hasFreeShipping && (
          <span className={styles.freeShipping}>Envío gratis</span>
        )}

        <p className={styles.installments}>
          en 6 cuotas de <strong>${installmentPrice}</strong> sin interés
        </p>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.actions}>
          {inCart ? (
            <div className={styles.addedMessage}>✓ Agregado al carrito</div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className={styles.buttonAdd}
            >
              Agregar al carrito
            </button>
          )}
          <Link to="/" className={styles.continueLink}>
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
