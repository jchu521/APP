const { User } = require("../../models/user.model");
const { Role } = require("../../models/role.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Joi = require("joi");
const uuidv4 = require("uuid/v4");

const generateBearerToken = require("../../../utils/auth/generateBearerToken");
const generateIdToken = require("../../../utils/auth/generateIdToken");
const { verifyAccountEmail } = require("../../Email/index");

module.exports = async (req, res) => {
  //check validation
  const validateMessage = isValidate(req.body);

  if (validateMessage)
    return res.status(400).json({ message: validateMessage });

  // check password match
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({ message: ["PASSWORD NOT MATCH"] });

  // check Email already register
  if ((await User.find({ "email.address": req.body.email }).count()) > 0)
    return res.status(400).json({ message: ["EMAIL ALREADY REGISTER"] });

  const hash = bcrypt.hashSync(req.body.password, saltRounds);

  var role = await Role.findOne({ position: "Client" });
  const emailHash = uuidv4();

  let user = new User({
    email: {
      address: req.body.email,
      hash: emailHash,
      isVerify: false
    },
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash,
    role
  });

  const accessToken = generateBearerToken(user._id);
  user.accessToken = accessToken;

  await user.save();

  const idToken = generateIdToken({
    _id: user._id,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isEmailVerify: false,
    role
  });

  verifyAccountEmail(user._id, emailHash, req.body.email);

  return res.status(201).json({
    message: ["Register successfully"],
    idToken,
    expiresIn: 15,
    accessToken
  });
};

function isValidate(user) {
  const schema = Joi.object().keys({
    firstName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .error(() => "First Name Required: length 3~30"),
    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .error(() => "Last Name Required: length 3~30"),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .error(() => "Email Not Valid"),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,30})/)
      .required()
      .error(() => "Password Must contain a-z, A-Z 0-9, !@#$%^&*")
  });

  const options = { abortEarly: false };
  const result = Joi.validate(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    },
    schema,
    options
  );

  if (result.error) {
    var message = result.error.details.map(d => d.message);
    return message;
  }
}
