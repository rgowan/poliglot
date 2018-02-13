import React  from 'react';
import axios  from 'axios';
import moment from 'moment';

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
