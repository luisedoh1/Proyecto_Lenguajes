import '../components/Product/Product.css';
import Hero from '../components/Hero/Hero';
import '../components/Hero/Hero.css';
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <HorizontalScroll />
    </div>
  );
};

export default Home;
