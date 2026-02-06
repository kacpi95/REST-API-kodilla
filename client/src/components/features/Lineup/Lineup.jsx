import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Concerts from './../Concerts/Concerts';
import {
  getConcerts,
  getRequest,
  loadConcertsRequest,
} from '../../../redux/concertsRedux';
import AlertBox from '../../ui/AlertBox/AlertBox';
import SkeletonGrid from '../../ui/SkeletonGrid/SkeletonGrid';
import EmptyState from '../../ui/EmptyState/EmptyState';
import styles from './Lineup.module.scss';

export default function Lineup() {
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts);
  const request = useSelector(getRequest);

  const [q, setQ] = useState('');
  const [day, setDay] = useState('all');

  useEffect(() => {
    dispatch(loadConcertsRequest());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return concerts.filter((c) => {
      const matchesQ = c.performer.trim().toLowerCase().includes(q);
      const matchesDay = day === 'all' || String(c.day) === day;
      return matchesQ && matchesDay;
    });
  }, [concerts, q, day]);

  if (request.pending) return <SkeletonGrid count={6} />;
  if (request.error)
    return <AlertBox variant='warning'>{request.error}</AlertBox>;

  if (!request.success || concerts.length === 0) {
    return <EmptyState title='No concerts' description='Try again later.' />;
  }

  if (filtered.length === 0) {
    return (
      <EmptyState
        title='No matches'
        description='Try changing search or day.'
      />
    );
  }

  return (
    <div>
      <div className={styles.controls}>
        <input
          className={styles.input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Search performer…'
          aria-label='Search performer'
        />

        <select
          className={styles.select}
          value={day}
          onChange={(e) => setDay(e.target.value)}
          aria-label='Filter day'
        >
          <option value='all'>All days</option>
          <option value='1'>Day 1</option>
          <option value='2'>Day 2</option>
          <option value='3'>Day 3</option>
        </select>
      </div>

      <Concerts concerts={filtered} />
    </div>
  );
}
