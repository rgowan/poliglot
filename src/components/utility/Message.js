import React from 'react';
import axios from 'axios';
import moment from 'moment';

import Auth from '../../lib/Auth';

const Message = ({ data, language }) => {
  console.log(data);

  function messagePosition() {
    if (data.createdBy._id === Auth.getPayload().id) {
      return "right";
    } else {
      return "left";
    }
  }

  return (
    <div className={ "message " + messagePosition() }>
      <p>{ data.createdBy.first } <span>{ moment(data.updatedAt).format('LT') }</span></p>
      <p>{ data[language] }</p>
    </div>
  )
}

export default Message;
