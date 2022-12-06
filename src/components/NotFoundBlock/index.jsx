import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not Found :(
      </h1>
      <span className={styles.description}>
        Unfortunately this page is not available in our online store.{' '}
      </span>
    </div>
  );
};
export default NotFoundBlock;
