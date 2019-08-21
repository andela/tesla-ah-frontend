import React from 'react';
import PropTypes from 'prop-types';
import { Fab as FabButton, Action } from 'react-tiny-fab';

import '../../assets/scss/components/Fab.scss';
import '../../../node_modules/react-tiny-fab/dist/styles.css';

const Fab = (props) => {
  const {
    articles,
    followers,
    following,
    isCurrentUser,
  } = props;
  const actionStyles = { backgroundColor: '#00aeff', color: '#fff' };
  return (
    <div className="fab--container">
      <FabButton
        mainButtonStyles={{ ...actionStyles, backgroundColor: '#303346' }}
        position={{ bottom: 24, right: 24 }}
        icon={<i className="fas fa-bars" />}
        event="click"
      >
        <Action id="fabArticles" text="Articles" style={actionStyles} onClick={articles}>
          <i className="fas fa-feather" />
        </Action>
        <Action text="Followers" style={actionStyles} onClick={followers}>
          <i className="fas fa-users" />
        </Action>
        <Action text="Following" style={actionStyles} onClick={following}>
          <i className="fas fa-forward" />
        </Action>
        {isCurrentUser ? (
          <Action
            text="Edit Profile"
            style={actionStyles}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <i className="fas fa-user-edit" />
          </Action>
        ) : null }
      </FabButton>
    </div>
  );
};

Fab.propTypes = {
  articles: PropTypes.func.isRequired,
  followers: PropTypes.func.isRequired,
  following: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
};

export default Fab;
