import React, { useContext } from 'react';
import style from "../sass/signIn.module.scss";
import { FaYoutube } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import FormSignIn from "../components/FormSignIn";
import { UserContext } from '../utils/UserContext';


function SignIn() {

  const {value, setValue} = useContext(UserContext);
  return (
    <div className={style.container}>
      <FormSignIn />
    </div>
  );
}

export default SignIn;
