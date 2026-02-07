import OrderTicketForm from '../../components/features/OrderTicketForm/OrderTicketForm';
import styles from './OrderPage.module.scss';

export default function OrderPage() {
  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Order a ticket</h1>
          <p className={styles.lead}>
            Choose a day, pick an available seat, and enter your details.
            Booking is instant.
          </p>
        </div>

        <div className={styles.steps} aria-label='Steps'>
          <div className={styles.step}>
            <span className={styles.stepNum}>1</span> Day
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>2</span> Seat
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>3</span> Details
          </div>
        </div>
      </header>

      <OrderTicketForm />
    </div>
  );
}
