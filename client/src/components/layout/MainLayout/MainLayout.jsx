import MainMenu from '../MainMenu/MainMenu';
import Footer from '../Footer/Footer';
import styles from './MainLayout.module.scss';

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <MainMenu />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
}
