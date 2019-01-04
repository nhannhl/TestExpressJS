'use strict';
import Joi from 'joi';

const UserValidation = {};

UserValidation.postDataUser = {
    body: {
        gender: Joi.bool(),
        firstName: Joi.string().required().max(255),
        lastName: Joi.string().max(255),
        email: Joi.string().email(),
        password: Joi.string().required().max(20),
        age: Joi.number()
    }
}

UserValidation.paramIdUser = {
    params: {
        id: Joi.string().required()
    }
}

UserValidation.paramNameUser = {
    params: {
        name: Joi.string().max(20)
    },
    query: {
        name: Joi.string().max(20)
    }
}

export default UserValidation;