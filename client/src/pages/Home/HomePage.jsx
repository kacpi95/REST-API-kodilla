import PromoCarousel from '../../components/features/PromoCarousel/PromoCarousel';
import Lineup from '../../components/features/Lineup/Lineup';
import styles from './HomePage.module.scss';

export default function HomePage() {
  return (
    <div>
      <PromoCarousel />
      <div className={styles.container}>
        <h1>Who's on?</h1>
        <Lineup />
      </div>
    </div>
  );
}
