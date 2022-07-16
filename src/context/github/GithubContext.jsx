import { createContext, useState, useCallback, useReducer } from 'react';

import githubReducer from './githubReducer';

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  searchUsers: (text) => {},
  getUser: (login) => {},
  clear: () => {},
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

  const clear = () => dispatch({ type: 'CLEAR_USERS' });

  const context = {
    users: state.users,
    isLoading: state.isLoading,
    searchUsers,
    clear,
    getUser,
    user: state.user,
  };

  return (
    <GithubContext.Provider value={context}>{children}</GithubContext.Provider>
  );
};

export default GithubContext;
