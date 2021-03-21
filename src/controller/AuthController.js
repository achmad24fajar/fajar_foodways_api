const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.files)

    const schema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().email().min(10).max(50).required(),
      password: Joi.string().min(8).required(),
      phone: Joi.string().required(),
      location: Joi.string(),
      role: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail)
      return res.status(400).send({
        status: "Register failed",
        message: "Email already registered",
      });

    const hashStrength = 10;
    const hashedPassword = await bcrypt.hash(password, hashStrength);

    const user = await User.create({
      ...req.body,
      image: req.files.image[0].filename,
      video: req.files.video[0].filename,
      password: hashedPassword,
    });

    const secretKey = "akda4860@a9d1";
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    const url = "http://localhost:5000/uploads/";

    res.send({
      status: "success",
      message: "User Succesfully Registered",
      data: {
        user: {
          fullname: user.name,
          email: user.email,
          token,
          role: user.role,
          image: url + user.image,
          video: url + user.video,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};