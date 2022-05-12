import Joi from "joi";

export const productSchema = Joi.object({
    productId:   Joi.string().required(),
    product:  Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    value: Joi.number().required(),
    quantity: Joi.number().required()
});
