import { useContext } from 'react';

import GithubContext from '../../context/github/GithubContext';

import UserItem from './UserItem';
import Spinner from '../Layout/Spinner';

const UserResults = () => {
  const { isLoading, users } = useContext(GithubContext);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserResults;
