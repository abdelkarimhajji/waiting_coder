import style from "../sass/formSignIn.module.scss"

function FormSignIn() {
    return (
      <div className={style.container}>
            <h1>Waiting Coder</h1>
            <div className={style.inputs}>
                <input type="text" name="email" id="" placeholder="Enter your email"/>
                <input type="password" name="password" id="" placeholder="Enter your password"/>
                <input type="submit" value="submit" className={style.submit}/>
            </div>
      </div>
    );
  }
  
  export default FormSignIn;