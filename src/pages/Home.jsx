import { useContext } from 'react';

import Spinner from '../components/Layout/Spinner';
import UserResults from '../components/Users/UserResults';
import UserSearch from '../components/Users/UserSearch';
import GithubContext from '../context/github/GithubContext';

const Home = () => {
  const { users, isLoading } = useContext(GithubContext);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <UserSearch />
      {users?.length > 0 && <UserResults />}
    </>
  );
};

export default Home;
