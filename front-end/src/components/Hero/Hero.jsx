import { Link } from 'react-router-dom';
import './Hero.css';
import heroImage from '../imgs/Hero.png';

const Hero = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <h1>Welcome to Guardian Tech</h1>
        <p>Find the best prices in electronics just for you</p>
        <Link to="/products" className="cta-button">See More</Link>
      </div>
    </div>
  );
};

export default Hero;