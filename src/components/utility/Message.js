import React  from 'react';
import moment from 'moment';
import axios  from 'axios';

import Auth from '../../lib/Auth';

const Message = ({ data, language }) => {
  function handleClick(e) {
    const element = e.target;
    let id        = parseInt(element.id);
    const phrase  = encodeURIComponent(data.content);

    if (language.code !== ' ') {
      (id % 2 === 0) ? translate(element, phrase) : element.innerHTML = data.content;
      element.id = (id+=1).toString();
    } else {
      console.log('please select a language');
    }
  }

  function translate(element, phrase) {
    axios
      .get(`/api/translate/${phrase}/${language.code}`, { 
        headers: { Authorization: `Bearer ${Auth.getToken()}`}, 
        timeout: 5000
      })
      .then(res => element.innerHTML = res.data)
      .catch(err => console.log(err));
  }

  return (
    <div className={ "message "  + (data.createdBy.id === Auth.getPayload() .id ? 'right': 'left') }>
      <p>{ data.createdBy.first } <span>{ moment(data.updatedAt).format('LT') }</span></p>
      <p onClick={handleClick} data-message-id={data.id} id={0}>
        { data.content }
      </p>
    </div>
  )
}

export default Message;