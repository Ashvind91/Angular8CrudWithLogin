﻿var jwt = require('jsonwebtoken');
var config = require('../config');
function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' ,status: 403, data: null, token: token });
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', status: 500, data: null, token: token });
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}
module.exports = verifyToken;