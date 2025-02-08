import style from "../sass/signIn.module.scss";
import FormSignIn from "../components/FormSignIn";


function SignIn() {

  return (
    <div className={style.container}>
      <FormSignIn />
    </div>
  );
}

export default SignIn;
