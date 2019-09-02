/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import IO from 'socket.io-client';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withErrorHandler } from 'tesla-error-handler';
import axios from 'axios';
import { REMOTE_SOCKET_SERVER } from '../../utils/constants';
import { fetchProfile, getMessages } from '../../redux/actions/users/chat.actions';
import defaultAvatar from '../../assets/img/user.png';
import { messageAsc } from '../../utils/sortMessages';

// Components import
import Message from '../items/Message';
import ChatForm from '../layouts/ChatFormContainer';
import Preloader from '../widgets/Preloader';

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFriend: {},
      currentUser: props.user,
      messages: [],
      currentMessage: '',
    };
    props.getMessages(props.match.params.username);
    props.fetchProfile(props.match.params.username);
    this.socket = IO.connect(`${REMOTE_SOCKET_SERVER}/chats`);
  }

  componentDidMount() {
    const { socket } = this;
    /* istanbul ignore next */
    socket.on('connect', () => {
      const token = sessionStorage.getItem('token');
      socket.emit('new_user', token);
    });
    /* istanbul ignore next */
    socket.on('chat', (data) => {
      const { currentUser, messages } = this.state;
      const { match: { params: { username: friendUsername } } } = this.props;
      // eslint-disable-next-line max-len
      if ((data.receiver === currentUser.username && data.sender === friendUsername) || (data.sender === currentUser.username && data.receiver === friendUsername)) {
        this.setState({
          messages: [...messages, data],
        });
      }
    });
  }

  componentWillReceiveProps({ currentFriend, messages }) {
    this.setState({
      currentFriend,
    });
    const newMsg = messages.map((message) => {
      const single = {};
      single.message = message.message;
      single.sender = message.sender.username;
      single.receiver = message.receiver.username;
      single.time = message.createdAt;
      return single;
    });
    // eslint-disable-next-line react/destructuring-assignment
    // eslint-disable-next-line no-console
    console.log('Updated Msg', messageAsc(newMsg));
    this.setState({
      messages: newMsg,
    });
  }

  sendMessage = (e) => {
    e.preventDefault();
    const { currentMessage, currentFriend, currentUser } = this.state;
    this.socket.emit('chat', {
      message: currentMessage,
      receiver: currentFriend.username,
      sender: currentUser.username,
    });
    this.setState({
      currentMessage: '',
    });
  }

  render() {
    // eslint-disable-next-line max-len
    const {
      // eslint-disable-next-line max-len
      currentFriend: { avatar, username }, currentUser: { avatar: profilePicture, username: yourName }, currentMessage, messages,
    } = this.state;
    const { isPending } = this.props;
    if (isPending) return <Preloader />;
    return (
      <div className="chat__container mt-5 mb-5">
        <div className="chat__header container mb-5">
          <Link to="/users" className="chat__back">
            <i className="fas fa-angle-left fs-3x" />
          </Link>
          <Link to={`/profile/${username}`} className="chat__username">
            <h3 className="chat__friend">{username}</h3>
          </Link>
        </div>
        <div className="chat__box">
          <div className="chat__messages">
            {messages.map((message) => {
              if (message.sender === yourName) {
                return (
                  <Message
                    key={message.time}
                    isYours
                    data={message.message}
                    avatar={profilePicture || defaultAvatar}
                    time={message.time}
                  />
                );
              }
              return (
                <Message
                  data={message.message}
                  avatar={avatar || defaultAvatar}
                  time={message.time}
                />
              );
            })}
          </div>
          <ChatForm onSubmit={this.sendMessage}>
            <input
              type="text"
              value={currentMessage}
              onChange={({ target }) => this.setState({ currentMessage: target.value })}
              className="form-control"
              placeholder={`Type something for ${username}`}
            />
          </ChatForm>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line max-len
export const mapStateToProps = ({ chats: { currentFriend, messages, messagesPending: isPending }, login: { user } }) => ({
  currentFriend, messages, user, isPending,
});
// eslint-disable-next-line max-len
export default connect(mapStateToProps, { fetchProfile, getMessages })(withErrorHandler(Chat, axios));
