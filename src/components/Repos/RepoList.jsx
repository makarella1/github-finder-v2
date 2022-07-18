import RepoItem from './RepoItem';

const RepoList = ({ repos }) => {
  return (
    <div className="w-full shadow-lg rounded-lg card bg-neutral">
      <div className="card-body">
        <h2 className="card-title font-bold my-4 text-3xl">
          Top 10 Repositories
        </h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoList;
