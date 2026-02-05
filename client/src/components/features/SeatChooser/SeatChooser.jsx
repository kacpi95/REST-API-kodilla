import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSeats,
  loadSeatsRequest,
  getRequests,
} from '../../../redux/seatsRedux';
import styles from './SeatChooser.module.scss';
import Loader from '../../ui/Loader/Loader';
import AlertBox from '../../ui/AlertBox/AlertBox';

export default function SeatChooser({ chosenDay, chosenSeat, updateSeat }) {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);

  const seatsSum = 50;
  const seatsTaken = seats.filter((el) => el.day === chosenDay).length;
  const seatsFree = seatsSum - seatsTaken;

  useEffect(() => {
    dispatch(loadSeatsRequest());
  }, [dispatch]);

  const loadSeats = requests?.LOAD_SEATS;

  const isTaken = (seatId) =>
    seats.some((item) => item.seat === seatId && item.day === chosenDay);

  const renderSeat = (seatId) => {
    const taken = isTaken(seatId);
    const selected = seatId === chosenSeat;

    const className = [
      styles.seat,
      taken ? styles.taken : styles.free,
      selected ? styles.selected : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        key={seatId}
        type='button'
        className={className}
        disabled={taken}
        onClick={(e) => updateSeat(e, seatId)}
        aria-pressed={selected}
        aria-label={`Seat ${seatId}${taken ? ' taken' : ''}${selected ? ' selected' : ''}`}
      >
        {seatId}
      </button>
    );
  };

  return (
    <section>
      <h3>Pick a seat</h3>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotTaken}`} /> taken
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotFree}`} /> free
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotSelected}`} />{' '}
          selected
        </span>
      </div>

      {loadSeats?.pending && <Loader />}
      {loadSeats?.error && (
        <AlertBox variant='warning'>Couldn't load seats...</AlertBox>
      )}

      {loadSeats?.success && (
        <div className={styles.seats}>
          {Array.from({ length: seatsSum }, (_, i) => renderSeat(i + 1))}
        </div>
      )}

      <p className={styles.counter}>
        Free seats: <strong>{seatsFree}</strong> / {seatsSum}
      </p>
    </section>
  );
}
