import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className="container">
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
    </div>
  );
};
export default NotFoundBlock;
