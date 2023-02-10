import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().required().max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

export default { register, login };