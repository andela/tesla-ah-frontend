/* eslint-disable import/no-named-as-default */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import UserCard from '../Card/UserCard';

export default class Profilemenuitem extends Component {
  state = {
    isOpenUserCardPopover: false,
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  render() {
    return (
      <div className="profile-menu-container">
        <NavItem>
          <NavLink id="Popover2">
            <img
              onClick={this.toggleUserCardPopover}
              className="menu-profile-image"
              src={this.props.avata}
              alt="AH"
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
                  <Link to={`/profile/${this.props.user.username}`}>
                    <ListGroupItem
                      onClick={this.toggleUserCardPopover}
                      action
                      className="border-light"
                    >
                      <i className="fas fa-user" />
                      &nbsp;&nbsp; Profile
                    </ListGroupItem>
                  </Link>
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
                  <ListGroupItem
                    onClick={this.toggleUserCardPopover}
                    action
                    className="border-light"
                  >
                    <i className="fas fa-sign-out-alt" />
                    &nbsp;&nbsp; Logout
                  </ListGroupItem>
                </ListGroup>
              </UserCard>
            </PopoverBody>
          </Popover>
        </NavItem>
      </div>
    );
  }
}
