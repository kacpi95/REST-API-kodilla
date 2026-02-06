import styles from './SkeletonGrid.module.scss';

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className={styles.grid} aria-busy='true' aria-label='Loading'>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.image} />
          <div className={styles.body}>
            <div className={styles.line} />
            <div className={styles.lineShort} />
            <div className={styles.badges}>
              <div className={styles.badge} />
              <div className={styles.badge} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
