const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(req.headers);
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { _id, type } = decoded;
        req._id = _id;
        req._type = type;
        next();
    } catch {
        next({
            status: 401,
            message: 'Authorization Failed',
        });
    }
};
module.exports = isAuth;
