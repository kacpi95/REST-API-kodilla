import AlertBox from '../../components/ui/AlertBox/AlertBox';
import styles from './PricesPage.module.scss';

const PRICES = [
  {
    day: 1,
    price: 25,
    workshops: [
      'Rock Music Style',
      'How to make your voice growl',
      'Make your voice stronger',
      'History of Rock',
    ],
  },
  {
    day: 2,
    price: 25,
    workshops: [
      'Find your real tune',
      'Find your real YOU',
      'Feel the music',
      'Jam session',
    ],
  },
  {
    day: 3,
    price: 50,
    workshops: [
      'Increase your vocal range',
      'How to properly warm up before singing',
      "It's time for YOU!",
    ],
  },
];

export default function PricesPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Tickets & Pricing</h1>
          <p className={styles.lead}>
            Prices may differ depending on the festival day. Each ticket
            includes the main performance plus 10+ workshops to boost your vocal
            skills and confidence.
          </p>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>From</span>
            <span className={styles.summaryValue}>$25</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Days</span>
            <span className={styles.summaryValue}>1–3</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Workshops</span>
            <span className={styles.summaryValue}>10+</span>
          </div>

          <a className={styles.cta} href='/order-a-ticket'>
            Order a ticket
          </a>
        </div>
      </header>

      <AlertBox variant='info'>
        <strong>Attention!</strong> Children under 4 can enter for free with an
        adult ticket.
      </AlertBox>

      <section className={styles.grid} aria-label='Pricing by day'>
        {PRICES.map(({ day, price, workshops }) => (
          <article key={day} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.badge}>Day {day}</span>
              <span className={styles.price}>${price}</span>
            </div>

            <h2 className={styles.cardTitle}>Workshops included</h2>
            <ul className={styles.list}>
              {workshops.map((w) => (
                <li key={w} className={styles.listItem}>
                  <span className={styles.check}>✓</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className={styles.faq} aria-label='Pricing notes'>
        <h2 className={styles.sectionTitle}>Good to know</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqTitle}>One ticket = one day</h3>
            <p className={styles.faqText}>
              Tickets are day-based. If you want to attend multiple days, book
              each day separately.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqTitle}>Seat selection</h3>
            <p className={styles.faqText}>
              Choose an available seat during checkout. Taken seats can’t be
              selected.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqTitle}>Payment</h3>
            <p className={styles.faqText}>
              After booking, you’ll receive an email with payment instructions
              (demo flow).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
