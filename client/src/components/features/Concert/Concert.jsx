import styles from './Concert.module.scss';

export default function Concert({ performer, price, genre, day, image }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={image} alt={performer} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{performer}</h3>
        <p className={styles.subtitle}>{genre}</p>

        <div className={styles.meta}>
          <span className={styles.badge}>Day {day}</span>
          <span className={styles.badge}>${price}</span>
        </div>
      </div>
    </article>
  );
}
