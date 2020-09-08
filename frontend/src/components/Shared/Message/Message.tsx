import React from 'react';

interface IProps {
  type: 'success' | 'error' | 'info';
  title: string;
  text?: string;
}

function Message(props: IProps) {
  return (
    <div className={props.type}>
      <div className={`${props.type}-title`}>{props.title}</div>
      {props.text && <p className='error-text'>{props.text}</p>}
    </div>
  );
}

export default Message;
