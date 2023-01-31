const { User } = require("../../../models");
const bcrypt = require("bcryptjs");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    // jika ada error berarti validate berupa array yg lenghtnya > 1
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "email is already been used by another account",
    });
  }
  const password = await bcrypt.hash(req.body.password, 15);
  const data = {
    email: req.body.email,
    name: req.body.name,
    password: password,
    profession: req.body.profession,
    role: "student",
  };

  const createdUser = await User.create(data);

  return res.json({
    status :"success",
    data : createdUser
  })
};
