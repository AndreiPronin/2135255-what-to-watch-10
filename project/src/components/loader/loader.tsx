import { useAppSelector } from '../../hooks';
import './loader.css';

function Loader():JSX.Element{
  const isLoad = useAppSelector((state) => state.isLoad);
  if(isLoad === true){
    return (
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    );
  }else{
    return (
      <div></div>
    );
  }
}
export default Loader;
