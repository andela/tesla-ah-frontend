/* eslint-disable no-unused-vars */
import React from 'react';

import classNames from 'classnames';
import ReactImageFallback from 'react-image-fallback';
import { DEFAULT_AVATA } from '../../utils/constants';

const Avatar = ({
  rounded,
  circle,
  src,
  size,
  tag: Tag,
  className,
  style,
}) => {
  const classes = classNames({ 'rounded-circle': circle, rounded }, className);
  return (
    <ReactImageFallback
      src={src}
      fallbackImage={DEFAULT_AVATA}
      initialImage={DEFAULT_AVATA}
      alt="Profile"
      style={{ width: size, height: size, ...style }}
      className={classes}
    />
  );
};

Avatar.defaultProps = {
  tag: 'img',
  rounded: false,
  circle: true,
  size: 40,
  src: 'dc',
  style: {},
};

export default Avatar;
