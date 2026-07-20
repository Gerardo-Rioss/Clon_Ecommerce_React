import { useState } from "react";
import styles from "./ProductCard.module.css";
import type { Product } from "../../../types/Product";
import { Link } from "react-router";

type ProductCardProps = {
  product: Product;
};

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23f5f5f5' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ccc' font-size='14' font-family='sans-serif'%3ESin imagen%3C/text%3E%3C/svg%3E";

/**
 * Formatea precio con centavos como superscript.
 * Ej: 1234.50 → "$1.234" + superscript "50"
 */
function formatPriceParts(price: number) {
  const parts = price.toFixed(2).split(".");
  return { integer: parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."), cents: parts[1] };
}

function StarRating({ rate }: { rate: number }) {
  const fullStars = Math.round(rate);
  const stars = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  return <span className={styles.stars}>{stars}</span>;
}

function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hasFreeShipping = product.price > 50;

  const { integer, cents } = formatPriceParts(product.price);
  const installmentPrice = (product.price / 6).toFixed(2).replace(".", ",");

  return (
    <Link to={`/product/${product.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          {!imgLoaded && !imgError && <div className={styles.imageSkeleton} />}
          <img
            src={imgError ? PLACEHOLDER_IMG : product.image}
            alt={product.title}
            className={`${styles.image} ${imgLoaded ? styles.imageLoaded : ""}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
          {hasFreeShipping && (
            <span className={styles.shippingBadge}>Envío gratis</span>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.priceRow}>
            <span className={styles.priceSymbol}>$</span>
            <span className={styles.priceInteger}>{integer}</span>
            <span className={styles.priceCents}>{cents}</span>
          </div>

          <p className={styles.installments}>
            en 6 cuotas de <strong>${installmentPrice}</strong> sin interés
          </p>

          <h3 className={styles.title}>{product.title}</h3>

          <div className={styles.rating}>
            <StarRating rate={product.rating.rate} />
            <span className={styles.reviewCount}>{product.rating.count}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;
