import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router";
import styles from "./Checkout.module.css";
import { formatUSD } from "../../utils/formatPrice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

const checkoutSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(3, "Mínimo 3 caracteres"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  address: Yup.string()
    .required("La dirección es obligatoria")
    .min(10, "Ingresá una dirección completa"),
  phone: Yup.string()
    .matches(/^[\d\s\-+()]{7,20}$/, "Teléfono inválido")
    .required("El teléfono es obligatorio"),
});

type CheckoutValues = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [totalCheck, setTotalCheck] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedData, setConfirmedData] = useState<CheckoutValues | null>(null);

  const handleSubmit = async (values: CheckoutValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTotalCheck(total);
    setConfirmedData(values);
    clearCart();
    setConfirmed(true);
  };

  if (confirmed && confirmedData) {
    return (
      <div className={styles.confirmation}>
        <div className={styles.confirmCard}>
          <div className={styles.confirmIcon}>✓</div>
          <h1 className={styles.confirmTitle}>
            ¡Gracias por tu compra, {confirmedData.name}!
          </h1>
          <div className={styles.confirmDetails}>
            <div className={styles.confirmRow}>
              <span className={styles.confirmLabel}>Dirección</span>
              <span>{confirmedData.address}</span>
            </div>
            <div className={styles.confirmRow}>
              <span className={styles.confirmLabel}>Email</span>
              <span>{confirmedData.email}</span>
            </div>
            <div className={styles.confirmRow}>
              <span className={styles.confirmLabel}>Teléfono</span>
              <span>{confirmedData.phone}</span>
            </div>
            <div className={styles.confirmTotal}>
              Total pagado: <strong>{formatUSD(totalCheck)}</strong>
            </div>
          </div>
          <Link to="/" className={styles.confirmButton}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      {/* Resumen */}
      <div className={styles.summary}>
        <h2 className={styles.sectionTitle}>Resumen de compra</h2>
        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Tu carrito está vacío</p>
            <Link to="/" className={styles.link}>Ir a comprar</Link>
          </div>
        ) : (
          <>
            <div className={styles.productList}>
              {cart.map((product) => (
                <div key={product.id} className={styles.productItem}>
                  <div className={styles.productImageWrapper}>
                    <img src={product.image} alt={product.title} className={styles.productImage} />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.title}</span>
                    <div className={styles.productMeta}>
                      <span className={styles.productQty}>x{product.quantity}</span>
                      <PriceDisplay price={product.price * product.quantity} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.totalLine}>
              <span>Total</span>
              <span className={styles.totalAmount}>{formatUSD(total)}</span>
            </div>
            <Link to="/cart" className={styles.link}>Editar carrito</Link>
          </>
        )}
      </div>

      {/* Formulario */}
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Información de envío</h2>
        <Formik
          initialValues={{ name: "", email: "", address: "", phone: "" }}
          validationSchema={checkoutSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Nombre completo</label>
                <Field name="name" type="text" className={styles.input} placeholder="Ej: Juan Pérez" />
                <ErrorMessage name="name" component="div" className={styles.error} />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                <Field name="email" type="email" className={styles.input} placeholder="ejemplo@correo.com" />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>Teléfono</label>
                <Field name="phone" type="tel" className={styles.input} placeholder="+54 9 11 1234-5678" />
                <ErrorMessage name="phone" component="div" className={styles.error} />
              </div>

              <div className={styles.field}>
                <label htmlFor="address" className={styles.label}>Dirección de envío</label>
                <Field name="address" as="textarea" className={`${styles.input} ${styles.textarea}`} placeholder="Calle, número, piso, ciudad..." rows={3} />
                <ErrorMessage name="address" component="div" className={styles.error} />
              </div>

              <button type="submit" className={styles.submit} disabled={isSubmitting || cart.length === 0}>
                {isSubmitting ? <span className={styles.spinner} /> : "Confirmar Compra"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Checkout;
