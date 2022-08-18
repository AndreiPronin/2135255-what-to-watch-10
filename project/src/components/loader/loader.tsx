import { useAppSelector } from '../../hooks';
import { getLoad } from '../../store/film-process/selectors';
import './loader.css';

function Loader():JSX.Element{
  const isLoad = useAppSelector(getLoad);

  if(isLoad === true){
    return (
      <div data-testid='loader' className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    );
  }else{
    return (
      <div data-testid='no-loader'></div>
    );
  }
}
export default Loader;
