import { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

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
  } = user;

  const websiteUrl = blog?.startsWith('http')
    ? `http://${blog}`
    : `https://${blog}`;

  return (
    <>
      <div className="w-full mx-auto">
        <div className="mb-4">
          <Link className="btn btn-ghost" to="/">
            Back to Search
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
        <div className="mx-auto shadow-xl relative md-6 mb-8 md:mb-0">
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
                {blog ? <a href={websiteUrl}>{blog}</a> : 'Not stated :('}
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
    </>
  );
};

export default User;
