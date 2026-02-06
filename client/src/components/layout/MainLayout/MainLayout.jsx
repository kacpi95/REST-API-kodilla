import MainMenu from '../MainMenu/MainMenu';
import Footer from '../Footer/Footer';

export default function MainLayout({ children }) {
  return (
    <div className='layout'>
      <MainMenu />
      <main className='content'>{children}</main>
      <Footer />
    </div>
  );
}
