import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/authSlice';
import './Navbar.css';
import logo from '../imgs/logo.svg';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt="Logo" className='icon logo' /></Link>
      </div>
      <ul>
        <li className="navbar__link"><Link to="/">Home</Link></li>
        <li className="navbar__link"><Link to="/products">Products</Link></li>
        <li className="navbar__link"><Link to="/cart">Cart</Link></li>
        {isLoggedIn ? (
          <li className="navbar__link"><button onClick={handleLogout} className="navbar__link">Logout</button></li>
        ) : (
          <li className="navbar__link"><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

