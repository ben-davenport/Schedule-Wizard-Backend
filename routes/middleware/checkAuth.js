const express = require('express')


const checkAuth = async (req, res, next)=>{
    const accessToken = req.cookies.accessToken;

    if(accessToken){
        res.locals.accessToken = accessToken;
        next()
    }
    else{
        res.status(403).send({
            msg: 'Forbidden',
            status: 403
        })
    }
};

module.exports = checkAuth;