import React from 'react';

import Navbar from '../utility/Navbar';

class ChatsIndex extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return(
      <div>
        <Navbar title='Chats' />
      </div>
    );
  } 
}

export default ChatsIndex;
