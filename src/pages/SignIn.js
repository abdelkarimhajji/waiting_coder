import React from 'react';
import style from "../sass/signIn.module.scss";
import { FaYoutube } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import FormSignIn from "../components/FormSignIn";

function SignIn() {
  return (
    <div className={style.container}>
      <FormSignIn />
    </div>
  );
}

export default SignIn;
