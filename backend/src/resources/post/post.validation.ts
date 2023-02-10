import Joi from 'joi'

const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
})

const update = Joi.object({
    title: Joi.string(),
    body: Joi.string()
});

const register = Joi.object({
    name: Joi.string().required().max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    role:Joi.string().required()
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
})

export default { create,update,register,login };