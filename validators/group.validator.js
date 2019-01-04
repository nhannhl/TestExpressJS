'use strict';
import Joi from 'joi';

const GroupValidate = {};

GroupValidate.newGroup = {
    body: {
        name: Joi.string().max(20),
        author: Joi.string()
    }
}

GroupValidate.checkId = {
    params: {
        id: Joi.string().required() 
    },
    query: {
        id: Joi.string().required()
    }
}

GroupValidate.checkMembers = {
    params: {
        members: Joi.array().items(Joi.string())
    }
}

export default GroupValidate;