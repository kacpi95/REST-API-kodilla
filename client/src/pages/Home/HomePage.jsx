import PromoCarousel from '../../components/features/PromoCarousel/PromoCarousel';
import Lineup from '../../components/features/Lineup/Lineup';

export default function HomePage() {
  return (
    <>
      <PromoCarousel />
      <div className={`container`}>
        <h1>Who's on?</h1>
        <Lineup />
      </div>
    </>
  );
}
