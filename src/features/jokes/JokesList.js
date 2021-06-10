import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { JokePropType } from 'utils/props';
import { flipJoke, blacklistJoke } from 'features/jokes';
import { Joke } from './Joke';
import styles from './JokesList.module.scss';

export function JokesList({ jokes }) {
  const dispatch = useDispatch();

  const onJokeFlip = (jokeId) => dispatch(flipJoke(jokeId));
  const onJokeBlacklist = (jokeId) => dispatch(blacklistJoke(jokeId));

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Jokes List:
      </h1>
      <ul className={styles.jokes}>
        {jokes.map(joke => (
          <li key={joke.id} className={styles.jokeWrapper}>
            <Joke joke={joke} onFlip={() => onJokeFlip(joke.id)} onBlacklist={() => onJokeBlacklist(joke.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

JokesList.propTypes = {
  jokes: PropTypes.arrayOf(JokePropType),
};

JokesList.defaultProps = {
  jokes: [],
};
