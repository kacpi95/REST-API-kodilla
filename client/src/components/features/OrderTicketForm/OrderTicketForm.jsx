import { useMemo, useState } from 'react';
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
  const [accepted, setAccepted] = useState(false);

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
    setOrder((prev) => ({ ...prev, [name]: parseInt(value, 10), seat: '' }));
  };

  const addSeat = requests?.ADD_SEAT;

  const canSubmit = useMemo(() => {
    return Boolean(
      order.client &&
      order.email &&
      order.day &&
      order.seat &&
      accepted &&
      !addSeat?.pending,
    );
  }, [order, accepted, addSeat?.pending]);

  const submitForm = async (e) => {
    e.preventDefault();

    if (canSubmit) {
      await dispatch(addSeatRequest(order));

      setOrder({ client: '', email: '', day: 1, seat: '' });
      setAccepted(false);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Your details</h2>
            <p className={styles.cardSub}>
              Day <strong>{order.day}</strong>
              {order.seat ? (
                <>
                  · Seat <strong>{order.seat}</strong>
                </>
              ) : (
                <span className={styles.muted}>
                  · Choose a seat on the right
                </span>
              )}
            </p>
          </div>

          {isError && (
            <AlertBox variant='warning'>
              Please fill in name & email, choose a seat, and accept terms.
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
              Festival day
            </label>
            <select
              id='clientDay'
              className={styles.select}
              value={order.day}
              name='day'
              onChange={updateNumberField}
            >
              <option value={1}>Day 1</option>
              <option value={2}>Day 2</option>
              <option value={3}>Day 3</option>
            </select>

            <small className={styles.help}>
              One ticket is valid for one day. Changing the day clears the
              selected seat.
            </small>
          </div>

          <label className={styles.checkboxRow}>
            <input
              className={styles.checkbox}
              type='checkbox'
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>
              I agree with
              <a href='/terms-and-conditions'>Terms and conditions</a> and
              <a href='/privacy-policy'>Privacy Policy</a>.
            </span>
          </label>

          <button className={styles.button} type='submit' disabled={!canSubmit}>
            {order.seat
              ? `Book seat ${order.seat}`
              : 'Choose a seat to continue'}
          </button>
        </section>

        <aside className={styles.side}>
          <div className={styles.sideCard}>
            <div className={styles.sideHeader}>
              <h2 className={styles.sideTitle}>Choose your seat</h2>
              <p className={styles.sideSub}>
                Selected: <strong>{order.seat || '—'}</strong>
              </p>
            </div>

            <SeatChooser
              chosenDay={order.day}
              chosenSeat={order.seat}
              updateSeat={updateSeat}
            />
          </div>
        </aside>
      </div>
    </form>
  );
}
