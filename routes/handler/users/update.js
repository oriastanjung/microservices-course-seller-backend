const { User } = require("../../../models");
const Validator = require("fastest-validator");
const bcrypt = require("bcryptjs");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
    avatar: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "Account Not Found",
    });
  }

  const email = req.body.email;

  if (email) {
    const checkEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    if(checkEmail && email !== user.email){
        return res.status(409).json({
            status : "error",
            message : "Email Already Exist"
        })
    }
  }

  const password = await bcrypt.hash(req.body.password, 15);
  const {name, profession, avatar} = req.body;

  await user.update({
    email,
    password,
    name,
    profession,
    avatar
  })
  return res.json({
    status : "success",
    data : {
        email : user.email,
        name : user.name,
        profession : user.profession,
        avatar : user.avatar,
    }
  })
};