import style from "../sass/footer.module.scss";


function Footer() {
  
  return (
    <div className={style.container}>
        <div className={style.child}>
            <p>Edit-informations</p>
            <p>Portability-requests</p>
            <p>Anonymization-requests</p>
            <p>I-have-a-problem</p>
        </div>
    </div>
  );
}

export default Footer;
