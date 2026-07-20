import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import ProductForm from "../../components/product/ProductForm/ProductForm";
import type { ProductFormValues } from "../../types/ProductFormValues";
import styles from "./CreateProduct.module.css";
import { formatUSD } from "../../utils/formatPrice";

interface ProductResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function CreateProduct() {
  const [createdProduct, setCreatedProduct] = useState<ProductResponse | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: ProductFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        values
      );
      console.log("Producto creado con éxito:", response.data);
      setCreatedProduct(response.data);
      resetForm();
    } catch (error) {
      console.error("Error al crear el producto:", error);
      setErrorMessage(
        "Ocurrió un error al crear el producto. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccept = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      {errorMessage && (
        <div className={styles.errorAlert}>
          <svg className={styles.errorIcon} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
            />
          </svg>
          {errorMessage}
        </div>
      )}

      {!createdProduct ? (
        <ProductForm onSubmit={handleSubmit} />
      ) : (
        <div className={styles.successCard}>
          <div className={styles.successHeader}>
            <svg className={styles.successIcon} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
              />
            </svg>
            <h3 className={styles.successTitle}>
              ¡Producto creado exitosamente!
            </h3>
          </div>

          <div className={styles.productDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ID:</span>
              <span className={styles.detailValue}>{createdProduct.id}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Título:</span>
              <span className={styles.detailValue}>{createdProduct.title}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Precio:</span>
              <span className={styles.detailValue}>
                {formatUSD(createdProduct.price)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Categoría:</span>
              <span className={styles.detailValue}>
                {createdProduct.category}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Descripción:</span>
              <p className={styles.detailValue}>{createdProduct.description}</p>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={createdProduct.image}
                alt={createdProduct.title}
                className={styles.productImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/200?text=Imagen+no+disponible";
                }}
              />
            </div>
          </div>

          <button
            onClick={handleAccept}
            className={styles.buttonAccept}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.spinner}></span>
            ) : (
              "Volver al inicio"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
