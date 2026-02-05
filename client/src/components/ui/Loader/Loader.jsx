import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.wrapper} aria-busy='true' aria-label='Loading'>
      <div className={styles.bar} />
    </div>
  );
}
