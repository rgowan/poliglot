import React from 'react';

import Auth from '../../lib/Auth';

const Message = ({ data }) => {
  return (
    <div className={ "message "  + (data.createdBy.id === Auth.getPayload() .id ? 'right': 'left') }>
      <span>{ data.content }</span>
    </div>
  )
}

export default Message;