import Joi from "joi";

const user = Joi.object({
   email: Joi.string().email().required(),
   age: Joi.number().integer().min(18),
   name: Joi.string().min(3).max(40).trim().required()
})
export default {
   '/api/v1/user': user,
}