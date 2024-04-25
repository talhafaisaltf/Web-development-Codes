export const TOKEN_NAME = "TOKEN";
export const USER_NAME = "USER_NAME";

const saveToken = (token) => {
    if (!token) {
        return null;
    }

     localStorage.setItem(TOKEN_NAME, token);
};

const saveUserName = (userName) => {
    if (!userName) {
        return null;
    }

    localStorage.setItem(USER_NAME, userName);
};

const removeToken = () => {
    localStorage.removeItem(TOKEN_NAME);
};

const userLoggedIn = () => {
    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
        return false;
    }
    return true;
};

export const AuthServices = {
    saveToken,
    removeToken,
    saveUserName,
    userLoggedIn,
};