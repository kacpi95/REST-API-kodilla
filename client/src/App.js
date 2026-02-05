import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import HomePage from './pages/Home/HomePage';
import NotFound from './pages/NotFound/NotFoundPage';
import PricesPage from './pages/Prices/PricesPage';
import OrderPage from './pages/Order/OrderPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/prices' element={<PricesPage />} />
        <Route path='/order-a-ticket' element={<OrderPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
