import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import AlertContext from './context/alert/AlertContext';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Alert from './components/Layout/Alert';
import User from './pages/User';

const App = () => {
  const { alert } = useContext(AlertContext);

  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      {alert && <Alert />}
      <main className="container mx-auto px-3 mb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:login" element={<User />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
