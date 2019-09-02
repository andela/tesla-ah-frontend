import React from 'react';

const ChatForm = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className="chat__form">{children}</form>
);
export default ChatForm;
