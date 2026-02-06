import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './MainMenu.module.scss';

export default function MainMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link className={styles.brand} to='/' onClick={close}>
          New Wave Festival
        </Link>

        <button
          className={styles.toggler}
          type='button'
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls='main-nav'
          aria-label='Toggle navigation'
        >
          <span className={styles.burger} />
        </button>

        <nav
          id='main-nav'
          className={`${styles.nav} ${open ? styles.open : ''}`}
        >
          <NavLink className={linkClass} to='/' end onClick={close}>
            Home
          </NavLink>
          <NavLink className={linkClass} to='/prices' onClick={close}>
            Prices
          </NavLink>
          <NavLink className={styles.cta} to='/order-a-ticket' onClick={close}>
            Order a ticket
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
