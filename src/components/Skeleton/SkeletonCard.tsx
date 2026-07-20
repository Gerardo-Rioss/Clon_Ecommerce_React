import Skeleton from "@mui/material/Skeleton";
import styles from "./SkeletonCard.module.css";

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <Skeleton
        variant="rectangular"
        className={styles.image}
        animation="wave"
      />
      <div className={styles.content}>
        <Skeleton variant="text" width="40%" height={18} animation="wave" />
        <Skeleton variant="text" width="90%" height={14} animation="wave" />
        <Skeleton variant="text" width="60%" height={12} animation="wave" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailImage}>
        <Skeleton variant="rectangular" height={350} animation="wave" sx={{ borderRadius: 1 }} />
      </div>
      <div className={styles.detailContent}>
        <Skeleton variant="text" width="30%" height={16} animation="wave" />
        <Skeleton variant="text" width="40%" height={28} animation="wave" />
        <Skeleton variant="text" width="90%" height={14} animation="wave" />
        <Skeleton variant="text" width="100%" height={14} animation="wave" />
        <Skeleton variant="text" width="70%" height={14} animation="wave" />
        <Skeleton variant="rectangular" height={44} animation="wave" sx={{ borderRadius: 1, mt: 2 }} />
      </div>
    </div>
  );
}

export default SkeletonCard;
