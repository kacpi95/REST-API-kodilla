import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <small>Copyright &copy; New Wave Festival 2026</small>
      </div>
    </footer>
  );
}
