## Key concepts worth noting

- Use of Joi package

This is very key in validation of data before sending it to the database-[REF](https://www.digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation)

```
<!-- Name should start with a letter -->
const name = Joi.string().regex(/^[A-Z]+$/).uppercase()
<!-- Fullname with a spacing in the middle -->
const fullname = Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase()
<!-- Confirm password has to reference the password -->
const confirmPassword = Joi.string().valid(Joi.ref('password')).required().strict()
<!-- Accepts both number and word as age -->
const ageSchema = Joi.alternatives().try([
Joi.number().integer().greater(6).required(),
Joi.string().replace(/^([7-9]|[1-9]\d+)(y|yr|yrs)?$/i, '$1').required()
]);
<!-- Declaring numbers as positives and adding a precision -->
const amount = Joi.number().positive().greater(1).precision(2).required()
<!-- Card number input using creditCard method -->
const cardNumber = Joi.string().creditCard().required()
<!-- Dates validation in Joi -->
const completedAt = Joi.date().timestamp().required()
<!-- sample personal dataSchema -->
const personDataSchema = Joi.object().keys({
  id: personID.required(),
  firstname: name,
  lastname: name,
  fullname: Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase(),
  type: Joi.string().valid('STUDENT', 'TEACHER').uppercase().required(),

  age: Joi.when('type', {
    is: 'STUDENT',
    then: ageSchema.required(),
    otherwise: ageSchema
  })
})
.xor('firstname', 'fullname')
.and('firstname', 'lastname')
.without('fullname', ['firstname', 'lastname']);

```

- Jest

Jest is a testing library developed by facebook and in its operation it can automatically detect your test files as long as you name them using the three conventions.

- **_tests_**
- **[name].spec.js**
- **[name].test.js**
