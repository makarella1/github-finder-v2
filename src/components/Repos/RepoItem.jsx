import { FaLink, FaStar, FaEye, FaInfo, FaUtensils } from 'react-icons/fa';

const RepoItem = ({ repo }) => {
  const {
    name,
    html_url,
    description,
    stargazers_count,
    watchers_count,
    forks_count,
    open_issues,
  } = repo;

  return (
    <div className="card bg-base-100 rounded-md hover:bg-base-200">
      <div className="card-body">
        <h3 className="mb-2 font-semibold text-xl">
          <a href={html_url} target="_blank" rel="noreferrer">
            <FaLink className="inline mr-2" /> {name}
          </a>
        </h3>
        <p className="mb-3">{description ?? 'Not Stated'}</p>
        <div>
          <div className="badge badge-warning mr-3">
            <FaStar className="mr-2" /> {stargazers_count}
          </div>
          <div className="badge badge-info mr-3">
            <FaEye className="mr-2" /> {watchers_count}
          </div>
          <div className="badge badge-error mr-3">
            <FaInfo className="mr-2" /> {open_issues}
          </div>
          <div className="badge badge-accent mr-3">
            <FaUtensils className="mr-2" /> {forks_count}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RepoItem;
