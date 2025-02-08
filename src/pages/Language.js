import style from "../sass/language.module.scss";
import Navbar from '../components/Navbar';
import Searsh from '../components/Searsh'
import MainLanguage from '../components/MainLanguage'
import Footer from '../components/Footer'

function Language() {

//   const {value, setValue, isLogin, setIsLogin} = useContext(UserContext);

  return (
    <div className={style.container}>
        <div className={style.navbar}>
            <Navbar />
        </div>
        <div className={style.nextNav}>
            <Searsh />
            <MainLanguage />
            <Footer />
        </div>
    </div>
  );
}

export default Language;
