import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/authSlice';
import logo from "../imgs/logo.svg";
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
                <Link to="/"><img className="icon logo" src={logo} alt="Logo" /></Link>

            </div>
            <ul className="navbar-links">
                <li className="navbar-link"><Link to="/admin/list" className="navbar__link">Products</Link></li>
                <li className="navbar-link"><Link to="/admin/categories" className="navbar__link">Categories</Link></li>
                <li className="navbar-link"><Link to="/cart" className="navbar__link">Reports</Link></li>
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