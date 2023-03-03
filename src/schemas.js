import Joi from "joi";

//user schema
const user = Joi.object({
   email: Joi.string().email().lowercase().required(),
   age: Joi.number().integer().min(18),
   name: Joi.string().min(3).max(40).trim().required(),
   password: Joi.string().min(7).required().strict()
})
//post schema
const post = Joi.object({
   averageRating: Joi.number().positive().integer().min(0).max(5).precision(1),
   title: Joi.string().min(10).max(256).required(),
   content: Joi.string().min(10).max(256).required()
})
//category schema
const category = Joi.object({
   name: Joi.string().min(10).required()
})

export default {
   '/api/v1/user': user,
   '/api/v1/posts': post,
   '/api/v1/category': category,
}