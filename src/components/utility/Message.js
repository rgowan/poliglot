import React from 'react';
import moment from 'moment';

import Auth from '../../lib/Auth';

const Message = ({ data }) => {
  return (
    <div className={ "message "  + (data.createdBy.id === Auth.getPayload() .id ? 'right': 'left') }>
      <p>{ data.createdBy.first } <span>{ moment(data.updatedAt).format('LT') }</span></p>
      <p>{ data.content }</p>
    </div>
  )
}

export default Message;