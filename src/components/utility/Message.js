import React  from 'react';
import moment from 'moment';
import axios  from 'axios';

import Auth from '../../lib/Auth';

const Message = ({ data, language }) => {
  return (
    <div className={ "message " + (data.createdBy._id == Auth.getPayload().id || data.createdBy.id == Auth.getPayload().id ? "right": "left") }>
      <p>{ data.createdBy.first } <span>{ moment(data.updatedAt).format('LT') }</span></p>
      <p>{ data[language] }</p>
    </div>
  )
}

export default Message;
