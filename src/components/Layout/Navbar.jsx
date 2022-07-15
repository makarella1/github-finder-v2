import { Link } from 'react-router-dom';

import { FaGithub } from 'react-icons/fa';

const Navbar = ({ title = 'Github Finder' }) => {
  return (
    <nav className="navbar bg-neutral text-neutral-content shadow-lg mb-12">
      <div className="container mx-auto">
        <div className="px-2 mx-2">
          <FaGithub className="inline pr-3 text-5xl" />
          <Link
            className="text-lg font-bold align-middle transition-colors hover:text-white"
            to="/"
          >
            <span className="hidden sm:inline">{title}</span>
          </Link>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link className="btn btn-ghost btn-sm" to="/">
              Home
            </Link>
            <Link className="btn btn-ghost btn-sm" to="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
