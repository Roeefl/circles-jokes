import React from 'react';
import useTimeout from 'use-timeout';
import ReactCardFlip from 'react-card-flip';
import { JokePropType } from 'utils/props';
import { BLACKLIST_INTERVAL } from 'utils/time';
import styles from './Joke.module.scss';

export function Joke({ joke, onFlip, onBlacklist }) {
  useTimeout(() => onBlacklist, BLACKLIST_INTERVAL);
  
  return (
    <ReactCardFlip isFlipped={joke.isVisible} flipDirection="vertical">
      <div onClick={onFlip} className={styles.front}>
        Display Joke
      </div>
      <div onClick={onFlip} className={styles.back}>
        <span className={styles.setup}>
          {joke.setup}
        </span>
        <span className={styles.punchline}>
          {joke.punchline}
        </span>
      </div>
    </ReactCardFlip>
  );
};

Joke.propTypes = {
  joke: JokePropType.isRequired,
};
