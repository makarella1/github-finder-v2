import { Link } from 'react-router-dom';

import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="max-w-lg text-center mx-auto">
      <h2 className="text-8xl text-white font-bold mb-2">Oops!</h2>
      <p className="text-4xl mb-10">
        <span className="font-bold">404</span> - Page not found!
      </p>
      <Link className="btn btn-lg btn-accent" to="/">
        <FaHome className="hidden sm:text-3xl sm:mr-3 sm:inline" /> Let's go
        home, ladies and gentlemen
      </Link>
    </div>
  );
};

export default NotFound;
