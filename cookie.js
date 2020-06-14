const cookie= {
    maxAge: 60 * 60 * 1000 * 24, // 1 day
    httpOnly: false,
    secure: true,
    sameSite: false,
    withCredentials: true,
    credentials: 'include',
};
module.exports = cookie;