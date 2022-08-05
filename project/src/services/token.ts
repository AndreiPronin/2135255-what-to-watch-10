const AUTH_TOKEN = 'TOKEN';

export type Token = string;
export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN, token);
};

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return token ?? '';
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN);
};
