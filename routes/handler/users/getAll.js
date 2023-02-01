const { User } = require("../../../models");

module.exports = async (req, res) => {
  const userIds = req.query.user_ids || [];

  const sqlOptions = {
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
  };
  
  if(userIds.length){
    sqlOptions.where = {
        id : userIds
    }
  }

  const data = await User.findAll(sqlOptions);

  return res.json({
    status: "success",
    data: data,
  });
};
