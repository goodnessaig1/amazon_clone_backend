const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const signup = (req, res, next) => {
  const validationRule = {
    firstLastName: 'required|string',
    mobileOrEmail: 'required|string',
    password: 'required|string|min:6',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};
const signIn = (req, res, next) => {
  const validationRule = {
    mobileOrEmail: 'required|email',
    password: 'required|string|min:6',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed, please, verify your email and password',
        data: err,
      });
    } else {
      next();
    }
  });
};
module.exports = {
  signup,
  signIn,
};
