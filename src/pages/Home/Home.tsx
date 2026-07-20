import { useProducts } from "../../hooks/useProducts";
import { useProductFilters } from "../../hooks/useProductFilters";
import styles from "./Home.module.css";
import ProductList from "../../components/product/ProductList/ProductList";
import ProductCard from "../../components/product/ProductCard/ProductCard";
import { SkeletonGrid } from "../../components/Skeleton/SkeletonCard";

function Home() {
  const { data: products, error, isLoading } = useProducts();
  const { filteredProducts } = useProductFilters(products);

  if (isLoading) {
    return <SkeletonGrid count={12} />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error al cargar productos</p>
      </div>
    );
  }

  return filteredProducts.length === 0 ? (
    <div className={styles.emptyContainer}>
      <span className={styles.emptyIcon}>🔍</span>
      <h2 className={styles.emptyTitle}>No se encontraron productos</h2>
      <p className={styles.emptyMessage}>
        Intente ajustar su búsqueda o filtros
      </p>
    </div>
  ) : (
    <div className={styles.container}>
      <ProductList title="Productos">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductList>
    </div>
  );
}

export default Home;
