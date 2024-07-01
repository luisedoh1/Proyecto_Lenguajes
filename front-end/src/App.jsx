import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store/index';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/Product/ProductList';
import AdminNavbar from './components/Navbar/AdminNavbar';
import Categories from './components/Categories/Categories';
const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login'
  const role = useSelector((state) => state.auth.role)
  return (
    <Provider store={store}>

      {showNavbar && (role === 'admin' ? <AdminNavbar /> : <Navbar />)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/list" element={<ProductList />} />
          <Route path="/admin/categories" element={<Categories />} />


        </Routes>
    </Provider>
  );
};

export default App;
