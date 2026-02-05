import styles from './AlertBox.module.scss';

export default function AlertBox({ variant = 'info', children }) {
  return (
    <div className={`${styles.alert} ${styles[variant]}`} role='alert'>
      {children}
    </div>
  );
}
