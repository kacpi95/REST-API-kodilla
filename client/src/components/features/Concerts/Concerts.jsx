import Concert from '../Concert/Concert';
import styles from './Concerts.module.scss';

export default function Concerts({ concerts }) {
  return (
    <div className={styles.grid}>
      {concerts.map((c) => (
        <Concert
          key={c._id || `${c.performer}-${c.day}-${c.price}`}
          performer={c.performer}
          price={c.price}
          genre={c.genre}
          day={c.day}
          image={c.image}
        />
      ))}
    </div>
  );
}
