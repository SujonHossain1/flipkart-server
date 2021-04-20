const jwt = require('jsonwebtoken');

exports.userIsAuth = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { _id, type } = decoded;
        req.user = { _id, type };
        next();
    } catch {
        next({
            status: 401,
            message: 'Authorization Failed',
        });
    }
};

exports.adminIsAuth = (req, res, next) => {
    const { administrator } = req.headers;
    try {
        const token = administrator.split(' ')[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { _id, type } = decoded;

        if (type !== 'admin') {
            return next({
                status: 401,
                message: 'Admin Authorization Failed Role',
            });
        }

        res.admin = { _id, type };
        next();
    } catch {
        next({
            status: 401,
            message: 'Admin Authorization Failed',
        });
    }
};
