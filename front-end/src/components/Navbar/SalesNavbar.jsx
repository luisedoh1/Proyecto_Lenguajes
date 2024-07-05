import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/authSlice';
import logo from "../imgs/logo2.svg";
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
                <Link to="/">
                    <img src={logo} alt="Logo" className='icon Logo' />
                    <span className="navbar-text">Guardian Tech</span>
                </Link>
            </div>
            <ul className="navbar-links">
                <li className="navbar-link"><Link to="/sales/dashboard" className="navbar__link">Dashboard</Link></li>
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