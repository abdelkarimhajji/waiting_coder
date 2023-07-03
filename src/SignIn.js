import style from "./sass/signIn.module.scss"
import { FaYoutube } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import FormSignIn from "./components/FormSignIn"

function SignIn() {
    return (
      <div className={style.container}>
            {/* <FaYoutube className={style.icon}/>
            <AiOutlineUserAdd />
            <h1 className={style.test}>test</h1> */}
            <FormSignIn />
      </div>
    );
  }
  
  export default SignIn;