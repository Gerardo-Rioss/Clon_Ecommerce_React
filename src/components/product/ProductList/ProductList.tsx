import styles from "./ProductList.module.css";

type ProductListProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function ProductList(props: ProductListProps) {
  const { title, children } = props;
  return (
    <section className={styles.listContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.productContainer}>{children}</div>
    </section>
  );
}

export default ProductList;
