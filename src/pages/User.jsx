import { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import GithubContext from '../context/github/GithubContext';
import { getUserAndRepos } from '../context/github/githubActions';

import { FaUsers, FaHandshake, FaFolder, FaCubes } from 'react-icons/fa';

import Spinner from '../components/Layout/Spinner';
import RepoList from '../components/Repos/RepoList';

const User = () => {
  const { login } = useParams();
  const { user, isLoading, repos, dispatch } = useContext(GithubContext);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });

    const getUserData = async () => {
      const userData = await getUserAndRepos(login);

      dispatch({
        type: 'GET_USER_AND_REPOS',
        payload: { user: userData.user, repos: userData.repos },
      });
    };

    getUserData();

    return () => {
      dispatch({ type: 'RESET_USER' });
    };
  }, [dispatch, login]);

  if (isLoading) {
    return <Spinner />;
  }

  const {
    login: userLogin,
    name,
    type,
    hireable,
    bio,
    html_url,
    avatar_url,
    location,
    blog,
    twitter_username,
    followers,
    following,
    public_repos,
    public_gists,
  } = user;

  const websiteUrl = blog?.startsWith('http') ? blog : `https://${blog}`;

  return (
    <>
      <div className="w-full mx-auto">
        <div className="mb-4">
          <Link className="btn btn-ghost" to="/">
            Back to Search
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mb-6 md:gap-8">
        <div className="mx-auto shadow-xl relative">
          <figure>
            <img
              className="opacity-50 rounded-lg"
              src={avatar_url}
              alt={name}
            />
          </figure>
          <div className="absolute bottom-5 left-5">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <h3 className="text-xl font-semibold">{userLogin}</h3>
          </div>
        </div>

        <div className="col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl">
              {name}
              <div className="badge mr-1 ml-2 badge-warning font-bold">
                {type}
              </div>
              <div className="badge badge-success font-bold">
                {hireable ? 'Hireable' : 'Not hireable'}
              </div>
            </h1>
          </div>
          <p className="text-xl mb-10">{bio}</p>
          <div className="card-actions mb-10">
            <a
              className="btn btn-error btn-outline rounded-md"
              href={html_url}
              target="_blank"
              rel="noreferrer"
            >
              Visit GitHub Page
            </a>
          </div>

          <div className="stats shadow-lg bg-neutral w-full stats-vertical md:stats-horizontal">
            <div className="stat">
              <div className="stat-title">Location</div>
              <div className="stat-value text-lg md:text-sm xl:text-2xl">
                {location ?? 'Not stated :('}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Website</div>
              <div className="stat-value text-lg md:text-sm xl:text-2xl">
                {blog ? (
                  <a href={websiteUrl} target="_blank" rel="noreferrer">
                    {blog}
                  </a>
                ) : (
                  'Not stated :('
                )}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Twitter</div>
              <div className="stat-value text-lg md:text-sm xl:text-2xl">
                {twitter_username ? (
                  <a
                    href={`https://twitter.com/${twitter_username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {twitter_username}
                  </a>
                ) : (
                  'Not stated :('
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mb-6 py-5 rounded-lg shadow-lg bg-neutral stats stats-vertical lg:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-error ">
            <FaUsers className="text-3xl md:text-5xl" />
          </div>
          <div className="stat-title pr-5">Followers</div>
          <div className="stat-value text-3xl pr-5 md:text-4xl">
            {followers}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error">
            <FaHandshake className="text-3xl md:text-5xl" />
          </div>
          <div className="stat-title pr-5">Following</div>
          <div className="stat-value text-3xl pr-5 md:text-4xl">
            {following}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error">
            <FaFolder className="text-3xl md:text-5xl" />
          </div>
          <div className="stat-title pr-5">Public Repos</div>
          <div className="stat-value text-3xl pr-5 md:text-4xl">
            {public_repos}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error">
            <FaCubes className="text-3xl md:text-5xl" />
          </div>
          <div className="stat-title pr-5">Public Gists</div>
          <div className="stat-value text-3xl pr-5 md:text-4xl">
            {public_gists}
          </div>
        </div>
      </div>

      <RepoList repos={repos} />
    </>
  );
};

export default User;
