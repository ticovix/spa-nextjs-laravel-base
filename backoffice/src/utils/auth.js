import { isBrowser } from 'utils';

const tokenName = '@Admin-Token';

export const setJWT = (token) => {
  try {
    let saved = false;
    if (isBrowser()) {
      saved = sessionStorage.setItem(tokenName, token);
    }

    return saved;
  } catch (error) {
    return null;
  }
};

export const getTokenJWT = () => {
  let token = null;
  if (isBrowser()) {
    token = sessionStorage.getItem(tokenName);
  }

  return token;
};

export const getJWT = () => {
  try {
    return `bearer ${getTokenJWT()}`;
  } catch (error) {
    return null;
  }
};

export const unsetJWT = () => {
  try {
    let deleted = false;
    if (isBrowser()) {
      deleted = sessionStorage.removeItem(tokenName);
    }

    return deleted;
  } catch (error) {
    return null;
  }
};

export const clear = () => {
  try {
    let cleared = false;
    if (isBrowser()) {
      cleared = sessionStorage.clear();
    }

    return cleared;
  } catch (error) {
    return null;
  }
};
