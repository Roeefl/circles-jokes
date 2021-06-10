import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInterval from '@use-it/interval';
import { fetchJokesAsync, selectJokes } from 'features/jokes';
import { JokesList } from 'features/jokes/JokesList';
import { JOKES_INTERVAL } from 'utils/time';
import logo from 'assets/logo.png';
import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const jokes = useSelector(selectJokes);

  const fetchJokes = () => dispatch(fetchJokesAsync());

  useEffect(() => fetchJokes(), []);
  useInterval(() => fetchJokes(), JOKES_INTERVAL);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={logo} alt="App Logo" className={styles.logo}/>
        Circles - Jokes App
      </header>
      <JokesList jokes={jokes} />
    </div>
  );
}

export default App;
