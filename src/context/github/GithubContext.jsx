import { createContext, useState, useCallback, useReducer } from 'react';

import githubReducer from './githubReducer';

const initialState = {
  users: [],
  user: {},
  repos: [],
  isLoading: false,
  searchUsers: (text) => {},
  getUser: (login) => {},
  getUserRepos: (login) => {},
  clear: () => {},
  resetUser: () => {},
};

const GithubContext = createContext(initialState);

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    dispatch({ type: 'GET_USERS', payload: items });
  };

  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({ type: 'GET_USER', payload: data });
    }
  };

  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    const sortedData = data.sort((a, b) => {
      if (a.stargazers_count > b.stargazers_count) {
        return -1;
      } else if (a.stargazers_count < b.stargazers_count) {
        return 1;
      }

      return 0;
    });

    dispatch({ type: 'GET_USER_REPOS', payload: sortedData });
  };

  const clear = () => dispatch({ type: 'CLEAR_USERS' });

  const resetUser = () => dispatch({ type: 'RESET_USER' });

  const context = {
    users: state.users,
    isLoading: state.isLoading,
    searchUsers,
    clear,
    getUser,
    user: state.user,
    repos: state.repos,
    getUserRepos,
    resetUser,
  };

  return (
    <GithubContext.Provider value={context}>{children}</GithubContext.Provider>
  );
};

export default GithubContext;
