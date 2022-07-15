import { FaAtom } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer flex items-center justify-center p-4 bg-neutral text-neutral-content">
      <div>
        <FaAtom className="text-2xl" />
      </div>
      <p>Copyright &copy; All rights reserved {year}</p>
    </footer>
  );
};

export default Footer;
