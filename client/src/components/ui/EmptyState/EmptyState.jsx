import styles from './EmptyState.module.scss';

export default function EmptyState({
  title = 'Nothing here',
  description = 'Try changing filters.',
}) {
  return (
    <div className={styles.empty} role='status'>
      <div className={styles.icon}>🎵</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
    </div>
  );
}
