import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store/index';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import { SalesPage } from './pages/SalesPage';
import { ProductsPage } from './pages/ProductsPage';
import { Cart } from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/Product/ProductList';
import AdminNavbar from './components/Navbar/AdminNavbar';
import SalesNavbar from './components/Navbar/SalesNavbar';
import Categories from './components/Categories/Categories';
import { ReportPage } from './pages/ReportPage';
import SignUp from './components/SignUp/SignUp';
import SearchOrderPage from './pages/SearchOrderPage';

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login'
  const role = useSelector((state) => state.auth.role)
  return (
    <Provider store={store}>

      {showNavbar && (role === 'admin' ? <AdminNavbar /> : role === 'sales' ? <SalesNavbar /> :<Navbar /> )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/list" element={<ProductList />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/reports" element={<ReportPage />} />
        <Route path="/sales/dashboard" element={<SalesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/search-order" element={<SearchOrderPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Provider>

  );
};

export default App;
