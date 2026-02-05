import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './MainMenu.module.scss';

export default function MainMenu() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link className={styles.brand} to='/'>
          New Wave Festival
        </Link>

        <button
          className={styles.toggler}
          type='button'
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label='Toggle navigation'
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          <NavLink className={styles.link} to='/' end>
            Home
          </NavLink>
          <NavLink className={styles.link} to='/prices'>
            Prices
          </NavLink>
          <NavLink className={styles.cta} to='/order-a-ticket'>
            Order a ticket!
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
