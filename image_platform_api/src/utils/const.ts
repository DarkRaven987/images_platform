export const passwordRegExp =
  /^(?=.*\d)(?=.*[!@#$%^&*_\-+=])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const ACCESS_TOKEN_KEY = 'JWT_ACCESS_SECRET';
export const ACCESS_TOKEN_EXPIRE_KEY = 'JWT_ACCESS_EXPIRE';
export const REFERSH_TOKEN_KEY = 'JWT_REFRESH_SECRET';
export const REFERSH_TOKEN_EXPIRE_KEY = 'JWT_REFRESH_EXPIRE';
