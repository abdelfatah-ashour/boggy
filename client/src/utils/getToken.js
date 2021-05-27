// HOC get a token
export const getTokenUser = req => {
    let user;
    if (req.cookies.c_user) {
        user = true;
    }
    return user;
};

export const getTokenAdmin = req => {
    let admin;
    if (req.cookies.c_admin) {
        admin = true;
    }
    return admin;
};
