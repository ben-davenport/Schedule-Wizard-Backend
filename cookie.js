const cookie= {
    maxAge: 60 * 60 * 1000 * 24, // 1 day
    httpOnly: true,
    secure: true,
    sameSite: true,
};
module.exports = cookie;