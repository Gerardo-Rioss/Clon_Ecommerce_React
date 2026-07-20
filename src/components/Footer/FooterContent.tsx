import styles from "./FooterContent.module.css";
import { Link } from "react-router";

export const FooterContent = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <h3 className={styles.title}>E-commerce React</h3>
          <p className={styles.desc}>
            Clon de Mercado Libre desarrollado con React 19, TypeScript y Material-UI.
          </p>
        </div>
        <div className={styles.col}>
          <h4 className={styles.heading}>Links</h4>
          <Link to="/" className={styles.link}>Inicio</Link>
          <Link to="/cart" className={styles.link}>Carrito</Link>
          <Link to="/createProduct" className={styles.link}>Vender</Link>
        </div>
        <div className={styles.col}>
          <p className={styles.copy}>&copy; {new Date().getFullYear()} — Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};
