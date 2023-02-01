const { User } = require("../../../models");

module.exports = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: [
      "id",
      "email",
      "name",
      "role",
      "profession",
      "avatar",
      "createdAt",
      "updatedAt",
    ],
  });

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Account Not Found",
    });
  }

  return res.json({
    status: "success",
    data: user,
  });
};
