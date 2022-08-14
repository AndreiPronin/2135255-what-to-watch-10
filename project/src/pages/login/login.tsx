import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {UserData} from '../../types/auth-data';
import {FormEvent, useState} from 'react';
import {loginAction, logoutAction} from '../../services/api-action';
import { AppRoute, AuthorizationStatus } from '../../enums/enum';
import { setError } from '../../store/film-process/film-process';
import { getError } from '../../store/film-process/selectors';

function Login(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const Error = useAppSelector(getError);
  const dispatch = useAppDispatch();
  const [formData,SetFormData] = useState({
    userEmail:'',
    userPassword:''
  });
  const onChangeInput = (e:React.ChangeEvent) =>{
    const {name,value} = e.target as HTMLInputElement;
    SetFormData({...formData, [name]: value});
  };
  const onSubmitLogin = (userData: UserData) => {
    dispatch(loginAction(userData));
  };
  const onSubmitLogOut = () => {
    dispatch(logoutAction());
  };
  const onSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const PassRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    if(!PassRegex.test(formData.userPassword)){
      dispatch(setError('Пароль должен состоять минимум из одной буквы и цифры'));
      return;
    }
    if ( formData.userEmail !== '') {
      dispatch(setError(''));
      onSubmitLogin({
        login: formData.userEmail,
        password: formData.userPassword,
      });
    }
  };
  const handleSubmitLogOut = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmitLogOut();
  };
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">{ authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}</h1>
      </header>

      <div className="sign-in user-page__content">
        {Error === '' ? '' : `${Error}`}
        {
          ((authorizationStatus === AuthorizationStatus.NoAuth) || (authorizationStatus === AuthorizationStatus.Unknown)) && (
            <form action="#" className="sign-in__form" onSubmit={onSubmitForm}>
              <div className="sign-in__fields">
                <div className="sign-in__field">
                  <input
                    className="sign-in__input"
                    type="email"
                    placeholder="Email address"
                    name="userEmail"
                    onChange={onChangeInput}
                  />
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className="sign-in__field">
                  <input
                    className="sign-in__input"
                    type="password"
                    placeholder="Password"
                    name="userPassword"
                    onChange={onChangeInput}
                  />
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button className="sign-in__btn" type="submit">Sign in</button>
              </div>
            </form>
          )
        }
        {
          authorizationStatus === AuthorizationStatus.Auth && (
            <form action="#" className="sign-in__form" onSubmit={handleSubmitLogOut}>
              <div className="sign-in__submit">
                <button className="sign-in__btn" type="submit">Log Out</button>
              </div>
            </form>
          )
        }
      </div>
    </div>
  );
}

export default Login;
