import React from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import './About.scss';

function About() {
  return (
    <div className='about-page'>
      <h1>About page</h1>

      <div>
        <ContactForm />
      </div>
    </div>
  );
}

export default About;
