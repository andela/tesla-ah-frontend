/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import Avatar from './Avata';

import UserCard from '../Card/UserCard';
import { loggOut } from '../../redux/actions/auth.actions';


class Profilemenuitem extends Component {
  state = {
    isOpenUserCardPopover: false,
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
    return (<Redirect to={`/profile/${this.props.user.username}`} />);
  };

  loggOut = (event) => {
    event.preventDefault();
    const { loggOut } = this.props;
    loggOut();
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace('/');
  };

  render() {
    return (
      <div className="profile-menu-container">
        <NavItem>
          <NavLink id="Popover2">
            <Avatar
              onClick={this.toggleUserCardPopover}
              src={this.props.avata}
              className="mb-2 menu-profile-image"
            />
          </NavLink>
          <Popover
            placement="bottom-end"
            isOpen={this.state.isOpenUserCardPopover}
            toggle={this.toggleUserCardPopover}
            target="Popover2"
            className="p-1 border-0"
            style={{ minWidth: 250 }}
          >
            <PopoverBody className="p-1">
              <UserCard
                title={`${this.props.user.firstName}  ${this.props.user.lastName}`}
                subtitle={`${this.props.user.email}`}
                className="border-light "
                avatar={this.props.avata}
              >
                <ListGroup flush>
                  <a href={`/profile/${this.props.user.username}`}>
                    <ListGroupItem
                      onClick={this.toggleUserCardPopover}
                      action
                      className="border-light"
                    >
                      <i className="fas fa-user" />
                      &nbsp;&nbsp; Profile
                    </ListGroupItem>
                  </a>
                  <Link to="/article/new">
                    <ListGroupItem
                      onClick={this.toggleUserCardPopover}
                      action
                      className="border-light"
                    >
                      <i className="fas fa-pen" />
                      &nbsp;&nbsp; Create New Story
                    </ListGroupItem>
                  </Link>
                  <Link to="/articles">
                    <ListGroupItem
                      onClick={this.toggleUserCardPopover}
                      action
                      className="border-light"
                    >
                      <i className="fas fa-user" />
                      &nbsp;&nbsp; My stories
                    </ListGroupItem>
                  </Link>
                  <Link to="/bookmarks">
                    <ListGroupItem
                      onClick={this.toggleUserCardPopover}
                      action
                      className="border-light"
                    >
                      <i className="fas fa-bookmark" />
                      &nbsp;&nbsp; Bookmarks
                    </ListGroupItem>
                  </Link>
                  <Link>
                    <ListGroupItem
                      onClick={this.toggleUserCardPopover}
                      action
                      className="border-light"
                    >
                      <i className="fas fa-question-circle" />
                      &nbsp;&nbsp; Help
                    </ListGroupItem>
                  </Link>
                  <Link to="/" onClick={this.loggOut}>
                    <ListGroupItem
                      onClick={this.toggleUserCardPopover}
                      action
                      className="border-light"
                    >
                      <i className="fas fa-sign-out-alt" />
                    &nbsp;&nbsp; Logout
                    </ListGroupItem>
                  </Link>
                </ListGroup>
              </UserCard>
            </PopoverBody>
          </Popover>
        </NavItem>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loggOut: () => dispatch(loggOut()),
});

export default connect(null, mapDispatchToProps)(Profilemenuitem);
