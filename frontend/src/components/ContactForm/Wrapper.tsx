import React from 'react';
import './Wrapper.scss';
import Form from './Form';

type IForm = {
  [x: string]: any;
};

function Wrapper() {
  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  return (
    <div>
      <h2>Contact form</h2>
      <Form onSubmit={onSubmit} />
    </div>
  );
}

export default Wrapper;
