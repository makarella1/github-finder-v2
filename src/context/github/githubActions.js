import axios from 'axios';

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
};

export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    per_page: 10,
  });

  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);

  const sortedRepos = repos.data.sort((a, b) => {
    if (a.stargazers_count > b.stargazers_count) {
      return -1;
    } else if (a.stargazers_count < b.stargazers_count) {
      return 1;
    }

    return 0;
  });

  return { user: user.data, repos: sortedRepos };
};
