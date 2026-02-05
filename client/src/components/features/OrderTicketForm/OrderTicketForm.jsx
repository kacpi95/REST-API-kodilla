import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SeatChooser from '../SeatChooser/SeatChooser';
import { addSeatRequest, getRequests } from '../../../redux/seatsRedux';
import styles from './OrderTicketForm.module.scss';
import AlertBox from '../../ui/AlertBox/AlertBox';
import Loader from '../../ui/Loader/Loader';

export default function OrderTicketForm() {
  const dispatch = useDispatch();
  const requests = useSelector(getRequests);

  const [order, setOrder] = useState({
    client: '',
    email: '',
    day: 1,
    seat: '',
  });

  const [isError, setIsError] = useState(false);

  const updateSeat = (e, seatId) => {
    e.preventDefault();
    setOrder((prev) => ({ ...prev, seat: seatId }));
  };

  const updateTextField = ({ target }) => {
    const { value, name } = target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const updateNumberField = ({ target }) => {
    const { value, name } = target;
    setOrder((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (order.client && order.email && order.day && order.seat) {
      await dispatch(addSeatRequest(order));

      setOrder({
        client: '',
        email: '',
        day: 1,
        seat: '',
      });
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const addSeat = requests?.ADD_SEAT;

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <div className={styles.grid}>
        <div>
          {isError && (
            <AlertBox variant='warning'>
              There are some errors in your form. Did you fill all fields and
              choose a seat?
            </AlertBox>
          )}

          {addSeat?.error && !isError && (
            <AlertBox variant='warning'>{addSeat.error}</AlertBox>
          )}

          {addSeat?.success && !isError && (
            <AlertBox variant='info'>
              You&apos;ve booked your ticket! Check your email to complete the
              payment.
            </AlertBox>
          )}

          {addSeat?.pending && <Loader />}

          <div className={styles.field}>
            <label className={styles.label} htmlFor='clientName'>
              Name
            </label>
            <input
              id='clientName'
              className={styles.input}
              type='text'
              value={order.client}
              name='client'
              onChange={updateTextField}
              placeholder='John Doe'
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor='clientEmail'>
              Email
            </label>
            <input
              id='clientEmail'
              className={styles.input}
              type='email'
              value={order.email}
              name='email'
              onChange={updateTextField}
              placeholder='johndoe@example.com'
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor='clientDay'>
              Select which day of festivals are you interested in:
            </label>

            <select
              id='clientDay'
              className={styles.select}
              value={order.day}
              name='day'
              onChange={updateNumberField}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>

            <small className={styles.help}>
              Every day of the festival uses an individual ticket. You can book
              only one ticket at a time.
            </small>
          </div>

          <label className={styles.checkboxRow}>
            <input className={styles.checkbox} required type='checkbox' />
            <span>
              I agree with{' '}
              <a href='/terms-and-conditions'>Terms and conditions</a> and{' '}
              <a href='/privacy-policy'>Privacy Policy</a>.
            </span>
          </label>

          <button
            className={styles.button}
            type='submit'
            disabled={addSeat?.pending}
          >
            Submit
          </button>
        </div>

        <div>
          <SeatChooser
            chosenDay={order.day}
            chosenSeat={order.seat}
            updateSeat={updateSeat}
          />
        </div>
      </div>
    </form>
  );
}
