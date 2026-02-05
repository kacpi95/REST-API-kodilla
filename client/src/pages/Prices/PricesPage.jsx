import AlertBox from '../../components/ui/AlertBox/AlertBox';
import styles from './PricesPage.module.scss';

export default function PricesPage() {
  return (
    <div className={styles.container}>
      <h1>Prices</h1>
      <p>
        Prices may differ according the day of the festival. Remember that
        ticket includes not only the star performance, but also 10+ workshops.
        We gathered several genre teachers to help you increase your vocal
        skills, as well as self confidence.
      </p>

      <AlertBox variant='info'>
        Attention!
        <strong>
          Children under 4 can go freely with you without any other fee!
        </strong>
      </AlertBox>

      <h2>Day one</h2>
      <p>Price: 25$</p>
      <p>
        Workshops: "Rock Music Style", "How to make you voice grooowl", "Make
        your voice stronger", "History of Rock"
      </p>

      <h2>Day two</h2>
      <p>Price: 25$</p>
      <p>
        Workshops: "Find your real tune", "Find your real YOU", "Fell the
        music", "Jam session"
      </p>

      <h2>Day three</h2>
      <p>Price: 50$</p>
      <p>
        Workshops: "Increase your vocal range", "How to properly warmup before
        singing", "It's time for YOU!"
      </p>
    </div>
  );
}
