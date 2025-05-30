import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="font-bold text-3xl text-blue-600 md:text-4xl leading-tight">
          Welcome to Kradoo Shop
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Browse through our list of curated products and discover something new
          today.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          Explore Products
        </Link>
      </div>
    </section>
  );
};

export default Home;
