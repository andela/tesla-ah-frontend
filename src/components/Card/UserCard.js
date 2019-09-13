import React from 'react';
import classNames from 'classnames';
import {
  Card, CardTitle, CardSubtitle, CardBody,
} from 'reactstrap';

import Avatar from '../menu/Avata';

export const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  text,
  children,
  className,
  ...restProps
}) => {
  const classes = classNames('bg-gradient-theme', className);
  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
        <Avatar src={avatar} size={avatarSize} className="mb-2" />
        <CardTitle className="popover-profile-text-t">{title}</CardTitle>
        {subtitle && (<CardSubtitle className="popover-profile-text">{subtitle}</CardSubtitle>)}
      </CardBody>
      {children}
    </Card>
  );
};

UserCard.defaultProps = {
  avatarSize: 80,
};

export default UserCard;
