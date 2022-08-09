export enum AppRoute{
  Main = '/',
  Login = '/login',
  MyList = '/mylist/',
  Film = '/films/',
  Player = '/player/',
  NotFound = '*',
  AddReview = '/addreview/'
}
export enum AuthorizationStatus{
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Promo = '/promo',
  Films = '/films',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite'
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export enum AddfavoriteFilmStatus{
  Add = 1,
  Delete = 0,
}

export enum RatitingText{
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}
export enum RatitingNumber{
  Bad = 3,
  Normal = 5,
  Good = 8,
  VeryGood = 9,
  Awesome = 10,
}

export enum DateOption {
  location = 'en',
  year = 'numeric',
  month = 'short',
  day = 'numeric',
}
