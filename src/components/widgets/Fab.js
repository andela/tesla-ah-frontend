import React from 'react';
import { Fab as FabButton, Action } from 'react-tiny-fab';

import '../../assets/scss/components/Fab.scss';
import '../../../node_modules/react-tiny-fab/dist/styles.css';

const Fab = (props) => {
  const { articles, followers, following } = props;
  const actionStyles = { backgroundColor: '#00aeff', color: '#fff' };
  return (
    <div className="fab">
      <FabButton
        mainButtonStyles={{ ...actionStyles, backgroundColor: '#303346' }}
        position={{ bottom: 24, right: 24 }}
        icon={<i className="fas fa-bars" />}
        event="hover"
      >
        <Action text="Articles" style={actionStyles} onClick={articles}>
          <i className="fas fa-feather" />
        </Action>
        <Action text="Followers" style={actionStyles} onClick={followers}>
          <i className="fas fa-users" />
        </Action>
        <Action text="Following" style={actionStyles} onClick={following}>
          <i className="fas fa-forward" />
        </Action>
        <Action
          text="Edit Profile"
          style={actionStyles}
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          <i className="fas fa-user-edit" />
        </Action>
      </FabButton>
    </div>
  );
};

export default Fab;
