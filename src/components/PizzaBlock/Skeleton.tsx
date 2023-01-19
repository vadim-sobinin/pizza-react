import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={492}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="278" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="323" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="440" rx="10" ry="10" width="103" height="27" />
    <rect x="167" y="428" rx="20" ry="20" width="105" height="45" />
  </ContentLoader>
);

export default Skeleton;
