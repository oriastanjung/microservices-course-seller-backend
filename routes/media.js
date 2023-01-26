const express = require("express");
const isBase64 = require("is-base64");
const router = express.Router();
const base64Img = require("base64-img");

const { Media } = require("../models");

router.post("/", (req, res) => {
  const { image } = req.body;
  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "invalid base64" });
  }
  base64Img.img(image, "./public/images", Date.now(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }

    // '/public/images/4124124141.png'
    // const filename = filepath.split('\\').pop().split("/").pop()    // for windows
    const filename = filepath.split("/").pop(); // for mac
    const media = await Media.create({
      image : `image/${filename}`
    })

    return res.json({
      status : "success",
      data : {
        id : media.id,
        image: `${req.get('host')}/images/${filename}`
      }
    })
  });
});

module.exports = router;
