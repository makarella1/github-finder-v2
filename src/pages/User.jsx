import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import GithubContext from '../context/github/GithubContext';
import Spinner from '../components/Layout/Spinner';

const User = () => {
  const { login } = useParams();
  const { getUser, user, isLoading } = useContext(GithubContext);

  useEffect(() => {
    getUser(login);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <p>{user.login}</p>;
};

export default User;
