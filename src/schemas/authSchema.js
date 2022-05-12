import Joi from "joi";

const pwdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/; 

export const signUpSchema = Joi.object({
    name:   Joi.string().required(),
    email:  Joi.string().email().required(),
    password: Joi.string().pattern(pwdRegex).required(),
    passwordConfirmation: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
});

export const signInSchema = Joi.object({
    email:  Joi.string().email().required(),
    password: Joi.string().required()
})