import OrderTicketForm from '../../components/features/OrderTicketForm/OrderTicketForm';
import styles from './OrderPage.module.scss';

export default function OrderPage() {
  return (
    <div className={styles.container}>
      <h1>Order a ticket</h1>
      <OrderTicketForm />
    </div>
  );
}
