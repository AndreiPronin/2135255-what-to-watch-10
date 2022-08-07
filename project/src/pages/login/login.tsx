import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {UserData} from '../../types/auth-data';
import {FormEvent, useState} from 'react';
import {loginAction, logoutAction} from '../../services/api-action';
import { AppRoute, AuthorizationStatus } from '../../enums/enum';

function Login(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
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
    if ( formData.userEmail !== '' && formData.userPassword !== '') {
      onSubmitLogin({
        login: formData.userEmail,
        password: formData.userPassword,
      });
    }
  };
  const handleSubmitLogOut = (evt: FormEvent<HTMLFormElement>) => {
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

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
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
