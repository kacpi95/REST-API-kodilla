import Concert from '../Concert/Concert';

export default function Concerts({ concerts }) {
  return (
    <section>
      {concerts.map((con) => (
        <Concert key={con._id} {...con} />
      ))}
    </section>
  );
}
