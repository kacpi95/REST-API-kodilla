import MainMenu from '../MainMenu/MainMenu';
import Footer from '../Footer/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <MainMenu />
      <main>{children}</main>
      <Footer />
    </>
  );
}
