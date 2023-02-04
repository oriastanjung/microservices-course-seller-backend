const jwt = require("jsonwebtoken");
const apiAdapter = require("../../apiAdapter");

const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_ACCESS_TOKEN_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const { refresh_token, email } = req.body;
    if (!refresh_token || !email) {
      return res.status(400).json({
        status: "error",
        message: "invalid token",
      });
    }

    const isTokenExist = await api.get("/refresh_tokens", {
      params: { refresh_token: refresh_token },
    });

    console.log(isTokenExist)
    jwt.verify(refresh_token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: err.message,
        });
      }

      if (email != decoded.data.email) {
        return res.status(403).josn({
          status: "error",
          message: "email not valid",
        });
      }

      const token = jwt.sign(
        { data: decoded.data },
        JWT_SECRET,
        {expiresIn : JWT_ACCESS_TOKEN_EXPIRED}
      );
      return res.json({
        status: "success",
        data: {
            token
        },
      });
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        status: "error",
        message: "Service Users Unavailable",
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
    // return res.status(400).json({
    //   status: "error",
    //   message: "error on catch",
    // });
  }
};
