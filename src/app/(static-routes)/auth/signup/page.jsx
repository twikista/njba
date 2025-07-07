'use client';
import React, { useState } from 'react';
// import { login, signup, logOut } from '@/lib/actions/auth';
import { signup, logOut, login } from '@/lib/actions/auth';

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formData = {
    firstName: 'Aaron',
    lastName: 'Anama',
    email: '',
    isAdmin: true,
    password: '',
    role: 'admin',
    isActivated: 'true',
  };
  const onSubmit = async () => {
    setIsSubmitting(true);
    const response = await signup(formData);
    setIsSubmitting(false);
  };

  // const onSignIn = async () => {
  //   setIsSubmitting(true)
  //   const response = login({
  //     email: 'aaronanama@gmail.com',
  //     password: '123456',
  //   })
  //   setIsSubmitting(false)
  //   console.log(response)
  // }

  const onLogOut = async () => {
    logOut();
    // setIsSubmitting(true)
    // const response = login({
    //   email: 'aaronanama@gmail.com',
    //   password: '123456',
    // })
    // setIsSubmitting(false)
    // console.log(response)
  };
  return (
    <div>
      <p>{isSubmitting ? 'loading...' : null}</p>
      <button className='block' type='button' onClick={onSubmit}>
        sign up
      </button>
      {/* <button className='block' type='button' onClick={onSignIn}>
        login
      </button> */}
      <button className='block' type='button' onClick={onLogOut}>
        log out
      </button>
    </div>
  );
}
