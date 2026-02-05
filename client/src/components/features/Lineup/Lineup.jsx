import Concerts from '../Concerts/Concerts';
import { useSelector, useDispatch } from 'react-redux';
import {
  getConcerts,
  getRequest,
  loadConcertsRequest,
} from '../../../redux/concertsRedux';
import { useEffect } from 'react';
import Loader from '../../ui/Loader/Loader';
import AlertBox from '../../ui/AlertBox/AlertBox';

export default function Lineup() {
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadConcertsRequest());
  }, [dispatch]);

  if (request.pending) return <Loader />;
  if (request.error)
    return <AlertBox variant='warning'>{request.error}</AlertBox>;
  if (!request.success || concerts.length === 0)
    return <AlertBox variant='info'>No concerts</AlertBox>;

  return <Concerts concerts={concerts} />;
}
