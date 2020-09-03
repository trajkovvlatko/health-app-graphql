import React from 'react';
import {useForm} from 'react-hook-form';
import './ContactForm.scss';

type IForm = {
  [x: string]: any;
};

function ContactForm() {
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  return (
    <div>
      <h2>Contact form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name='name' defaultValue='' ref={register({required: true})} />
        {errors.name && <span>This field is required</span>}

        <input name='message' ref={register({required: true})} />
        {errors.message && <span>This field is required</span>}

        <input type='submit' />
      </form>
    </div>
  );
}

export default ContactForm;
