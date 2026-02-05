import { Container } from 'reactstrap';
import OrderTicketForm from '../../components/features/OrderTicketForm/OrderTicketForm';

const Order = () => (
  <Container>
    <h1>Order a ticket</h1>
    <OrderTicketForm />
  </Container>
);

export default Order;