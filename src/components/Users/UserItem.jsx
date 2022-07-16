import { Link } from 'react-router-dom';

const UserItem = ({ user: { login = '', avatar_url = '' } }) => {
  return (
    <div className="card bg-neutral text-neutral-content shadow-md compact">
      <div className="flex flex-row items-center space-x-4 card-body">
        <div className="avatar">
          <div className="rounded-full shadow h-14 w-14">
            <img src={avatar_url} alt={login} />
          </div>
        </div>
        <div>
          <h2 className="card-title mb-2">{login}</h2>
          <Link className="btn btn-xs btn-outline" to={`/user/${login}`}>
            Visit profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
