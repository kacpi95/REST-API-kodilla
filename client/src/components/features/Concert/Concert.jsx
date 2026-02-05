import styles from './Concert.module.scss';

export default function Concert({ performer, price, genre, day, image }) {
  return (
    <article className={styles.concert}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={image} alt={performer} />
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.info}>
            <img className={styles.back} src={image} alt={performer} />
            <h2 className={styles.performer}>{performer}</h2>
            <h3 className={styles.genre}>{genre}</h3>
            <p className={styles.dayPrice}>
              Day: {day}, Price: {price}$
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
