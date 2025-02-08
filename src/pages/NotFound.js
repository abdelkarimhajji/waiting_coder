import { Link } from 'react-router-dom';
import {TbError404} from 'react-icons/tb';
import '../sass/index.scss';;

function NotFound() {


  return (
    <div className="containerNotFound">
        <div className='contBiError'>
        <TbError404 className='iconBiError'/>
        </div>
        <h1>Not found this page !!!</h1>
       <Link to="/Home"><button className='goToHome'>Go to Home</button></Link>
    </div>
  );
}
export default NotFound;