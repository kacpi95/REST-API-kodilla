import MainMenu from '../MainMenu/MainMenu';
import Footer from '../Footer/Footer';

export default function MainLayout({ children }) {
  <>
    <MainMenu />
    {children}
    <Footer />
  </>;
}
