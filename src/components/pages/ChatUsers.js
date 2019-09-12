/* eslint-disable no-console */
import React, { Fragment, Component } from 'react';
import IO from 'socket.io-client';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getUsers from '../../redux/actions/users/chat.actions';
import { REMOTE_SOCKET_SERVER } from '../../utils/constants';

// Components import
import User from '../items/Chatuser';
import Preloader from '../widgets/Preloader';
import Alert from '../common/Alert';

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    props.getUsers();
    this.socket = IO.connect(REMOTE_SOCKET_SERVER);
  }

  componentDidMount() {
    /* istanbul ignore next */
    this.socket.on('connect', () => {
      console.log('Connected!');
      this.socket.on('welcome', (message) => {
        console.log('Message:', message);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.users);
    this.setState({
      users: nextProps.users,
    });
  }

  render() {
    const { users } = this.state;
    const { pending } = this.props;
    if (pending) {
      return <Preloader />;
    }
    return (
      <Fragment>
        <div className="users__container">
          <h4 className="mt-5 users__title">Your Friends</h4>
          <div className="row mt-3 mb-5">
            <div className="col-sm-2" />
            <ul className="folowees__list list-group col-sm-8">
              {users.length ? (
                <div>
                  {users.map(user => (
                    <li
                      className="folowees__list--item list-group-item"
                      key={user.id}
                    >
                      <Link
                        to={`/users/${user.username}/chat`}
                        className="followees__list--item-link"
                      >
                        <User data={user} />
                      </Link>
                    </li>
                  ))}
                </div>
              ) : (
                <Alert type="info">
                  <p>No friends yet!</p>
                </Alert>
              )}
            </ul>
            <div className="col-sm-2" />
          </div>
        </div>
      </Fragment>
    );
  }
}

// eslint-disable-next-line max-len
export const mapStateToProps = ({
  chats: { users, usersPending: pending },
}) => ({ users, pending });
export default connect(
  mapStateToProps,
  { getUsers },
)(Users);
